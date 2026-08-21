import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validationResult } from "express-validator";
import { verifyAccountEmail } from "../utils/emailTemplates/verifyAccountEmail.js";
import { resetPasswordEmail } from "../utils/emailTemplates/resetPasswordEmail.js";
import { sendEmail } from "../services/email.service.js";

function generateToken(id, role) {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export const signUpUser = async (req, res, next) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);
    const user = new User({
      email: email,
      password: hashPassword,
      role: role,
      verificationToken: token,
      verificationTokenExpires: Date.now() + 900000,
    });
    await user.save();
    await sendEmail({
      to: user.email,
      subject: "Verify Account",
      html: verifyAccountEmail({
        email: user.email,
        verifyLink: `${process.env.FRONTEND_URL}/verify-account/${token}`,
      }),
    });
    return res
      .status(201)
      .json({
        message: "Check your mailbox for verify for the account ",
        user: user._id,
      });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyUser = async (req, res, next) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Token is expired or invalid" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "Email is not verified" });
    }
    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(401).json({ message: "Password doesn't matched" });
      }

      let token = generateToken(user._id, user.role);
      return res
        .status(200)
        .json({
          message: "User has logged in successfully",
          token: token,
          user: { id: user._id, email: user.email, role: user.role },
        });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString("hex");
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          message: "Couldn't find any account related to this eamil id",
        });
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 900000;
    await user.save();
    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: resetPasswordEmail({
        email: user.email,
        resetLink: `${process.env.FRONTEND_URL}/reset-password/${token}`,
      }),
    });

    return res
      .status(200)
      .json({
        message:
          "Password Reset Link has been sent at your email address successfully!",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  const { password, token } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Token Expired or doesn't Matched" });
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({
          message: "New password must be different from current password",
        });
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);
    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    return res
      .status(200)
      .json({ message: "Password has been updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resendVerification = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Account is already verified" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    user.verificationTokenExpires = Date.now() + 900000;
    await user.save();
    await sendEmail({
      to: user.email,
      subject: "Verify Account",
      html: verifyAccountEmail({
        email: user.email,
        verifyLink: `${process.env.FRONTEND_URL}/verify-account/${token}`,
      }),
    });
    return res
      .status(201)
      .json({
        message: "Check your mailbox for verify for the account ",
        user: user._id,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

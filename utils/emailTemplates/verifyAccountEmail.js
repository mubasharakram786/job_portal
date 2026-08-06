export const verifyAccountEmail = ({ email, verifyLink }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Verify your account</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:36px 40px;text-align:center;">
            <span style="display:inline-block;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">Job Portal</span>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 24px 40px;text-align:center;">
            <div style="width:64px;height:64px;background-color:#eff6ff;border-radius:50%;margin:0 auto 24px auto;line-height:64px;font-size:28px;">✉️</div>
            <h1 style="margin:0 0 12px 0;font-size:22px;color:#0f172a;">Verify your email address</h1>
            <p style="margin:0;font-size:15px;line-height:1.6;color:#475569;">
              Hi <strong style="color:#0f172a;">${email}</strong>, thanks for signing up! Please confirm this is your email address to activate your account.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 40px 32px 40px;text-align:center;">
            <a href="${verifyLink}" target="_blank" style="display:inline-block;background-color:#2563eb;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:10px;box-shadow:0 6px 16px rgba(37,99,235,0.35);">
              Verify Email
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px 40px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#94a3b8;">
              This link expires in <strong style="color:#64748b;">15 minutes</strong>. If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="margin:8px 0 0 0;font-size:13px;word-break:break-all;">
              <a href="${verifyLink}" target="_blank" style="color:#2563eb;text-decoration:none;">${verifyLink}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;font-size:13px;color:#94a3b8;">
              If you did not create this account, you can safely ignore this email.
            </p>
            <p style="margin:12px 0 0 0;font-size:13px;color:#cbd5e1;">
              &copy; ${new Date().getFullYear()} Job Portal. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
`

import jwt from 'jsonwebtoken'

export const auth = (req,res,next)=>{

    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if(!token){
        return res.status(401).json({message:"No token found"})
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.id
        next()
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token."})
    }

}
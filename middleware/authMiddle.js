import jwt from 'jsonwebtoken'

export const auth = (req,res,next)=>{

    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({message:"No token found"})
    }

    const decode = jwt.decode(token);

    if(!decode){
        return res.status(401).json({message:"Invalid or expired token."})
    }

    req.userId = decode.id
    
    next()

}
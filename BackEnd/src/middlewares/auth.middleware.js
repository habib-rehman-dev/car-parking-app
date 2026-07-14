import jwt from 'jsonwebtoken'

export default function protect(req, res, next){
    try{

        let token = req.cookies.token
        // console.log('hi habibi this is the token ' + token)
        if(!token) {
            return res.status(401).json({message : 'unautorized' , success: false})
        }
        req.user = jwt.verify(token , process.env.JWT_SECRET)
        // console.log(req.user)
        next()
    }
    catch(err){
        // here i have to throw an api error with the code 401 and the user will be got logout
        next(err)
    }
}
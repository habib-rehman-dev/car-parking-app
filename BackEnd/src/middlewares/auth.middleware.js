import jwt from 'jsonwebtoken'
import {AuthenticationError} from '../utils/errors.js'
import User from '../model/User.model.js'

export default async function protect(req, res, next){
    try{

        let token = req.cookies.token
       
        if(!token) {
            throw new AuthenticationError('unauthorized')
        }
        let decode = jwt.verify(token , process.env.JWT_SECRET)
        if(!decode){
            throw new AuthenticationError('Wrong token for authenticaiton')
        }
        let _di = decode._id
        let user = await User.findById(_di)
        
        if(!user){
            throw new AuthenticationError('User not found')
        }
        req.user = user
      
        next()
    }
    catch(err){
        // here i have to throw an api error with the code 401 and the user will be got logout
        next(err)
    }
}

function checkRole(roles){
    return (req, res, next) => {
        console.log(req.user)
        if(!roles.includes(req.user.role)){
            throw new AuthenticationError('you are not authorized to access this route')
        }
        next()
    }
}




export {checkRole}


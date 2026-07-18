import jwt from 'jsonwebtoken'
import {AuthenticationError} from '../utils/errors.js'
import User from '../model/User.model.js'

export default async function protect(req, res, next){
    try{

        let token = req.cookies.accessToken
       
        if(!token) {
            throw new AuthenticationError('unauthorized')
        }
        let decode = jwt.verify(token , process.env.ACCESS_SECRET)
        if(!decode){
            throw new AuthenticationError('Wrong token for authenticaiton')
        }
        let userId = decode.userId
        let user = await User.findById(userId)
        
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


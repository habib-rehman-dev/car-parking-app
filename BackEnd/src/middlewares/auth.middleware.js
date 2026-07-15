import jwt from 'jsonwebtoken'
import {AuthenticationError} from '../utils/errors.js'

export default function protect(req, res, next){
    try{

        let token = req.cookies.token
        // console.log('hi habibi this is the token ' + token)
        if(!token) {
            throw new AuthenticationError('unauthorized')
        }
        let decode = jwt.verify(token , process.env.JWT_SECRET)
        if(!decode){
            throw new AuthenticationError('Wrong token for authenticaiton')
        }
        req.user = decode
      
        next()
    }
    catch(err){
        // here i have to throw an api error with the code 401 and the user will be got logout
        next(err)
    }
}
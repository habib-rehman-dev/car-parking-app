import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs : 1000*60*15,
    limit: 10,
    message : 'try after 15 minuts',
    // statusCode: 429 defaul is seted over here
})
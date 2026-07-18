import cors from 'cors'
// import './env.js'
export default cors({
    origin : process.env.CLIENT_URL,
    credentials : true

})
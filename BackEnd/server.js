import app from './src/app.js'
import connectDB from './src/config/dbConnect.js';
import './src/config/env.js'
// connect of the mongoDB database
connectDB()


let PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`\n\n\nServer started on port ${PORT}`);
});

import 'dotenv/config';
import connectDB from './db/index.js';
import app from './app.js';


connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`MongoDB Connected But Error in App Listening : ${error}`);
        })
        app.listen(process.env.PORT || 3000, () => {
            console.log(`App is listening on PORT : ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(`MongoDB Connection Failed : ${error}`);
    })
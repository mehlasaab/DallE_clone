import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config(); //this will pull all the env var from .env file

const app = express();

// CORS is a security feature implemented by web browsers to restrict webpages from making requests to a different domain than the one that served the original web page. This is done to prevent potential security vulnerabilities, such as cross-site request forgery.
// In a Node.js application, if your server is serving resources (like APIs or static files) and your client-side code is hosted on a different domain, you might encounter CORS restrictions. To allow cross-origin requests, you need to configure your Node.js server to include the appropriate CORS headers in its responses.
app.use(cors()); //server will include the necessary headers in its responses to allow cross-origin requests from the specified domains

app.use(express.json({ limit : '50mb' })); // json obj limit

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/',async (req,res) => {
    res.send('Hello mf !')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(3000, () => console.log('Server has started on port http://localhost:3000'))
    } catch (error) {
        console.log(error);
    }
}
startServer();
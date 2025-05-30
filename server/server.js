import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config'
import userrouter from './routes/userroute.js';
import sellerrouter from './routes/sellerroute.js';
import connectCloudinary from './configs/cloudinary.js'
import productrouter from './routes/productroute.js';
import cartrouter from './routes/cartroute.js';
import addressrouter from './routes/addressroute.js';
import orderrouter from './routes/orderroute.js';
import { stripewebhook } from './controllers/ordercontroller.js';
const app = express();
const port = process.env.PORT || 3000;
const allowedorigins = ['http://localhost:5173'];
await connectDB();
await connectCloudinary();

app.post('/stripe', express.raw({ type: 'application/json' }), stripewebhook);
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedorigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("Server is working.");
});
app.use('/api/user', userrouter);
app.use('/api/seller', sellerrouter);
app.use('/api/product', productrouter);
app.use('/api/cart', cartrouter);
app.use('/api/address', addressrouter);
app.use('/api/order', orderrouter);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
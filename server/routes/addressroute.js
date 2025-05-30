import express from 'express';
import { addAddress ,getAddress} from '../controllers/addresscontroller.js';
import authuser from '../middlewares/authuser.js';
const addressrouter = express.Router();
addressrouter.post('/add', authuser, addAddress);
addressrouter.get('/get', authuser, getAddress);
export default addressrouter;
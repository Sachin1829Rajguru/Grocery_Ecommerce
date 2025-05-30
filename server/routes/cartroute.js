import express from 'express';
import authuser from '../middlewares/authuser.js';
import { updatecart } from '../controllers/cartcontroller.js';
const cartrouter = express.Router();
cartrouter.post('/update', authuser, updatecart);
export default cartrouter;
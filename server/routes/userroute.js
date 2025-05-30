import express from 'express';
import { register, login, isauth, logout } from '../controllers/usercontroller.js';
import authuser from '../middlewares/authuser.js';
const userrouter = express.Router();
userrouter.post('/register', register);
userrouter.post('/login', login);
userrouter.get('/is-auth', authuser, isauth);
userrouter.get('/logout', authuser, logout);
export default userrouter
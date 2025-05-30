import express from 'express'
import { sellerlogin, sellerlogout, issellerauth } from '../controllers/sellercontroller.js';
import authseller from '../middlewares/authseller.js'
const sellerrouter = express.Router();

sellerrouter.post('/login', sellerlogin);
sellerrouter.get('/is-auth', authseller, issellerauth);
sellerrouter.get('/logout', authseller, sellerlogout);
export default sellerrouter
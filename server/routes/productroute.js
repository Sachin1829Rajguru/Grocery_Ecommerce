import express from 'express';
import authseller from '../middlewares/authseller.js';
import { addproduct, changestock, productlist, singleproduct } from '../controllers/productcontroller.js';
import upload from '../configs/multer.js'
const productrouter = express.Router();
productrouter.post('/add', upload.array(["images"]), authseller, addproduct);
productrouter.get('/list', productlist);
productrouter.get('/id', singleproduct);
productrouter.post('/stock', authseller, changestock);
export default productrouter;
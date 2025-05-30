import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.js';
export const addproduct = async (req, res) => {
    try {
        let productdata = JSON.parse(req.body.productdata);
        const images = req.files;
        let imageurl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )
        await Product.create({ ...productdata, image: imageurl })
        return res.json({ success: true, message: "Product Added" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}




export const productlist = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.json({ success: true, products });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}





export const singleproduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        return res.json({ success: true, product });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}





export const changestock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        return res.json({ success: true, message: "Stock Updated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
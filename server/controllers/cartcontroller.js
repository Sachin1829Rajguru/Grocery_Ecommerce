import User from '../models/user.js';
export const updatecart = async (req, res) => {
    try {
        const userid  = req.userid;
        const { cartitems } = req.body;
        await User.findByIdAndUpdate(userid, { cartitems: cartitems });
        return res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

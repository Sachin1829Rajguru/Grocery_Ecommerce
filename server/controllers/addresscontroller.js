import Address from '../models/address.js'
export const addAddress = async (req, res) => {
    try {
        const userid = req.userid;
        const { address } = req.body;
        await Address.create({ ...address, userid });
        return res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}






export const getAddress = async (req, res) => {
    try {
        const userid = req.userid;
        const address = await Address.find({ userid });
        return res.json({ success: true, address });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}




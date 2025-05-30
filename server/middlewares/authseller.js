import jwt from 'jsonwebtoken'
const authseller = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }
    try {
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedtoken.email == process.env.SELLER_EMAIL) {
            next();
        }
        else {
            return res.json({ success: false, message: "Not Authorized" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export default authseller


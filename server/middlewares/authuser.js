import jwt from 'jsonwebtoken'
const authuser = async (req, res, next) => {
    const usertoken = req.cookies.usertoken;
    if (!usertoken) {
        return res.json({ success: false, message: "Not Authorized" });
    }
    try {
        const decodedtoken = jwt.verify(usertoken, process.env.JWT_SECRET);
        if (decodedtoken.id) {
            req.userid = decodedtoken.id;
            next();
        }
        else {
            return res.json({ success: false, message: "Not Authorized" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export default authuser
import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.json({ success: false, message: "Missing Details." });
        const existinguser = await User.findOne({ email: email });
        if (existinguser)
            return res.json({ success: false, message: "User already exists." });
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashpassword });
        const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('usertoken', usertoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, user: { name: user.name, email: user.email } });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.json({ success: false, message: "Email & Password are must." });
        const user = await User.findOne({ email });
        if (!user)
            return res.json({ success: false, message: "Email or Password is invalid." });
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch)
            return res.json({ success: false, message: "Email or Password is invalid." });
        const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('usertoken', usertoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, user: { name: user.name, email: user.email } });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}




export const isauth = async (req, res) => {
    try {
        const user = await User.findById(req.userid).select("-password");
        return res.json({ success: true, user });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}





export const logout = async (req, res) => {
    try {
        res.clearCookie('usertoken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Token = require("../models/token");


const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_KEY;
const refreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN_KEY;

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All feilds are required." });
    }
    try {

        const storedUser = await User.findOne({ email: email });
        if (!storedUser) {
            return res.status(400).json({ message: "Invalid Email." });
        }

        const matchPass = await bcrypt.compare(password, storedUser.password);
        if (!matchPass) {
            return res.status(400).json({ message: "Invalid password." });
        }

        const accessToken = jwt.sign({
            id: storedUser._id,
            email: storedUser.email,
            username: storedUser.username
        }, accessTokenSecretKey, { expiresIn: "15m" });

        const refreshToken = jwt.sign({
            id: storedUser._id,
            email: storedUser.email,
            username: storedUser.username
        }, refreshTokenSecretKey, { expiresIn: "30m" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            // path: "/",
        });

        await Token.create({ token: refreshToken });

        return res.status(201).json({ message: "User login successfully.", token: accessToken, userId: storedUser._id })


    } catch (error) {
        console.log("Login handler error", error);
        return res.status(500).json({ message: "Server error, failed to login the user." });
    }
}


const signupHandler = async (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ message: "All feilds are required." });
    }

    try {

        const storedUser = await User.findOne({ email });
        if (storedUser) {
            return res.status(400).json({ message: "Email address already exists." });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashPassword });

        return res.status(201).json({ message: "User created successfully.", user: { username: user.username, email: user.email, id: user._id } });


    } catch (error) {
        console.log("signup handler error", error);
        return res.status(500).json({ message: "Server error, failed to signup the user." });
    }

}


const refreshTokenHandler = async (req, res) => {
    const token = req.cookies?.refreshToken;
    console.log(req.cookies);

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    try {

        const refreshToken = await Token.findOne({ token });
        if (!refreshToken) {
            return res.status(401).json({ message: "Invalid token." })
        }

        const verifiedToken = jwt.verify(refreshToken.token, refreshTokenSecretKey);

        const accessToken = jwt.sign({
            id: verifiedToken.id,
            email: verifiedToken.email,
            username: verifiedToken.username
        }, accessTokenSecretKey, { expiresIn: "15m" });

        return res.status(200).json({ message: "Token refreshed successfully.", token: accessToken, userId: verifiedToken.id });

    } catch (error) {
        console.log("refresh token handler error", error);
        return res.status(403).json({ message: "Invalid or Expired Token." });
    }
}


const logoutHandler = async (req, res) => {
    const token = req.cookies?.refreshToken;
    console.log(req.cookies);

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            // path: "/",
        });
        await Token.deleteOne({ token });
        return res.status(200).json({ message: "User logout successfully." })
    } catch (error) {
        console.log("Logout handler eror", error);
        return res.status(500).json({ message: "Server error, failed to logout the user." });
    }
}

module.exports = {
    loginHandler,
    signupHandler,
    refreshTokenHandler,
    logoutHandler
}
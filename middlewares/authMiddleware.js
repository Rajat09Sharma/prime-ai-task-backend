const jwt = require("jsonwebtoken");

const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_KEY;

const authMiddleware = async (req, res, next) => {
    try {
        const bearerToken = req.headers["authorization"];

        const token = bearerToken.split(" ")[1];

        const payload = jwt.verify(token, accessTokenSecretKey);

        req.user = {
            id: payload.id,
            email: payload.email,
        }; 
        
        next();
        
    } catch (error) {
        console.log("Auth middleware error:", error.message);
        return res.status(403).json({ message: "Expired or Invalid token. Unauthorized access!" });
    }
};


module.exports = authMiddleware ;
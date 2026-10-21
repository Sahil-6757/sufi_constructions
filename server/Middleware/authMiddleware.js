const jwt = require("jsonwebtoken");
const mongoModel = require("../Controller/MongoSchema");

const authMiddleware = async (req, res, next) => {
    try {
        let token = null;

        // 1. Check Authorization header: Bearer <token>
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // 2. Check cookies if token not in headers
        if (!token && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // 3. Check query param fallback
        if (!token && req.query && req.query.token) {
            token = req.query.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please log in to access this resource."
            });
        }

        const secret = process.env.JWT_SECRET || "sufi_construction_jwt_secret_key_2024";
        const decoded = jwt.verify(token, secret);

        // Fetch user from DB (excluding password)
        const user = await mongoModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User session is invalid or user no longer exists."
            });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again."
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid authentication token. Authorization failed."
        });
    }
};

module.exports = authMiddleware;

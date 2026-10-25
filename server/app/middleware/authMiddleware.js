
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // 1. Authorization header se token lena
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token is required.",
            });
        }

        // 2. Bearer ke baad wala token nikalna
        const token = authHeader.split(" ")[1];

        // 3. Token verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. User ki information request mein attach karna
        req.user = decoded;

        // 5. Agle middleware ya controller par jaana
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

module.exports = authMiddleware;

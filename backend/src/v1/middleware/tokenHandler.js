const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

const decodeToken = (req) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ")[1];
        try {
            const tokenDecode = jsonwebtoken.verify(
                bearer,
                process.env.TOKEN_SECRET
            );
            return tokenDecode;
        } catch (err) {
            return false;
        }
    }
    return false;
};

const verifyToken = async (req, res, next) => {
    const tokenDecode = decodeToken(req);
    if (tokenDecode) {
        try {
            const user = await User.findById(tokenDecode.id);
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({
                    errors: [{ param: "token", msg: "Unauthorized!" }],
                });
            }
        } catch (err) {
            return res.status(500).json({
                errors: [{ param: "server", msg: "Internal Server Error" }],
            });
        }
    } else {
        return res.status(401).json({
            errors: [{ param: "token", msg: "Unauthorized!" }],
        });
    }
};

module.exports = {
    decodeToken,
    verifyToken,
};

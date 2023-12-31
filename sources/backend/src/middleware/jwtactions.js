import jwt from "jsonwebtoken"
require("dotenv").config();

const nonSecurePath = ["/auth/steam", "/auth/steam/return", "/jwt/steamid",
    "/cases", "/cases/skins", "/users/logout", "/users/quantity",
    "/users/opened/quantity", "/users/upgraded/quantity"]

const createJWT = (payload) => {  // create json web token
    let key = process.env.JWT_KEY
    let token = null
    try {
        token = jwt.sign(payload, key)
    } catch (e) {
        console.log("Create token error: ", e)
    }
    return token;
}
const verifyToken = (token) => {  // verify token
    let key = process.env.JWT_KEY
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (e) {
        console.log("Verify token error: ", e)
    }
    return decoded
}
const checkUserJWT = (req, res, next) => {  // check user json web token
    if (nonSecurePath.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decoded = verifyToken(token)
        if (decoded) {
            req.jwt = decoded
            next()
        } else {
            return res.status(401).json({
                EC: "-1",
                DT: "",
                EM: "User is not authenticate"
            })
        }
    } else {
        return res.status(401).json({
            EC: "-1",
            DT: "",
            EM: "User is not authenticate"
        })
    }
}
const checkUserPermisson = (req, res, next) => {  // control user's permisson
    if (nonSecurePath.includes(req.path)) return next();
    if (req.jwt) {
        let roles = req.jwt.data
        let currentURL = req.path;
        if (!roles || roles.lenght === 0) {
            return res.status(403).json({
                EC: "-1",
                DT: "",
                EM: "User do not have permission"
            })
        }
        let checkRole = roles.some(item => item.Role.URL === currentURL)
        if (checkRole === true) {
            next();
        } else {
            return res.status(403).json({
                EC: "-1",
                DT: "",
                EM: "User do not have permission"
            })
        }
    } else {
        return res.status(401).json({
            EC: "-1",
            DT: "",
            EM: "User is not authenticates"
        })
    }
}
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermisson
}
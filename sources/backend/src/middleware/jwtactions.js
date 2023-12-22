import jwt from "jsonwebtoken"
require("dotenv").config();
const createJWT = (payload) => {
    let key = process.env.JWT_KEY
    let token = null
    try {
        token = jwt.sign(payload, key)
    } catch (e) {
        console.log("Create token error: ", e)
    }
    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_KEY
    let data = null
    try {
        data = jwt.verify(token, key)
    } catch (e) {
        console.log("Verify token error: ", e)
    }
    return data
}
const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    console.log(cookies)
    next()
}
module.exports = {
    createJWT, verifyToken, checkUserJWT
}
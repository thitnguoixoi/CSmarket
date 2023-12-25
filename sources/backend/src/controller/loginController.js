const passport = require('passport');
import jwtService from "../service/jwtService"
require('dotenv').config();

const handleSteamAuth = passport.authenticate('steam', { session: false });
const handleSteamReturn = passport.authenticate('steam', { session: false });
const handleSendProfile = (req, res) => {
    res.render("authenticated", {
        steamprofile: JSON.stringify(req.user._json),
        clientUrl: "http://www.csmarket.me",
    });
}
const getJWT = async (req, res) => {
    try {
        if (!req.cookies.jwt || !req.cookies.login) {
            let data = await jwtService.getGroupRoles(req.query.steamid);
            if (data && data.DT && data.DT.access_token) {
                res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
                res.cookie("csmarket", "", { maxAge: 24 * 60 * 60 * 1000 })
            }
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            return res.status(400).json({
                EM: "User have been logined",
                EC: "-1",
                DT: ""
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}

module.exports = {
    handleSteamAuth,
    handleSteamReturn,
    handleSendProfile,
    getJWT,
}
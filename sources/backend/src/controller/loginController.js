const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
import jwtService from "../service/jwtService"
require('dotenv').config();
import { createJWT } from "../middleware/jwtactions"
const handleSteamAuth = passport.authenticate('steam', { session: false });
const handleSteamReturn = passport.authenticate('steam', { session: false });
const handleSendProfile = (req, res) => {
    res.render("authenticated", {
        steamprofile: JSON.stringify(req.user._json),
        clientUrl: process.env.REACT_URL,
    });
}
const getJWT = async (req, res) => {
    try {
        let data = await jwtService.getGroupRoles(req.query.steamid);

        let payload = {
            steamid: req.query.steamid,
            data: data.DT,
            expiresIn: process.env.JWT_EX
        }
        let token = createJWT(payload)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: {
                access_token: token,
                data: data.DT
            }
        })
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
    getJWT
}
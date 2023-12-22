const passport = require('passport');
import jwtService from "../service/jwtService"
require('dotenv').config();

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

        res.cookie("jwt", data.DT.access_toke, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
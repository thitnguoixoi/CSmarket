import db from "../models/index"
import { createJWT } from "../middleware/jwtactions"
require('dotenv').config();
const getGroupRoles = async (steamid) => {  // json web token service

    try {
        let user = await db.Users.findOne({
            where: {
                SteamID: steamid
            },
        });
        if (user) {
            user = user.get({ plain: true })
            let roles = await db.Group_Roles.findAll({
                where: { GroupID: user.GroupID },
                attributes: [],
                include: { model: db.Roles, attributes: ["URL"], }
            })
            let payload = {
                steamid: steamid,
                data: roles,
                expiresIn: process.env.JWT_EX
            }
            let token = createJWT(payload)
            return {
                EM: "Get JWT success",
                EC: "0",
                DT: {
                    access_token: token,
                    data: roles
                }
            }
        } else {
            return {
                EM: "User does not exist",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Get JWT error",
            EC: "-1",
            DT: []
        }
    }
}
module.exports = {
    getGroupRoles
}
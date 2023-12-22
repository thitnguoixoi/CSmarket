import db from "../models/index"
const getGroupRoles = async (steamid) => {

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
                attributes: ["RoleID", "GroupID"],
                include: { model: db.Roles, attributes: ["URL"], }
            })
            return {
                EM: "Get JWT success",
                EC: "0",
                DT: roles
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
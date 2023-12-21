import db from "../models/index"
const getGroupRoles = async (groupid) => {
    let roles = await db.Group_Users.findOne({
        where: { id: groupid },
        include: { models: db.Roles }
    })
    console.log("check roles:", roles)
}
module.exports = {
    getGroupRoles
}
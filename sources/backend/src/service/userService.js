import db from "../models/index"

const createUser = async (steamID) => {

    try {
        const user = await db.Users.findOne({ where: { SteamID: steamID } });

        if (!user) {
            await db.Users.create({ SteamID: steamID });
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }

}
const getUserList = async () => {
    let users = []
    users = await db.Users.findAll();
    return users;
}
const deleteUser = async (userid) => {
    await db.Users.destroy({
        where: {
            id: userid
        }
    })
}

const getUserTradeURL = async (id) => {
    let user = {}
    user = await db.Users.findOne({ where: { SteamID: id } })
    return user.get({ plain: true })
}
const updatedUser = async (id, TradeURL) => {
    await db.Users.update(
        { TradeURL: TradeURL },
        { where: { id: id } })
}
module.exports = {
    createUser,
    getUserList,
    deleteUser,
    getUserTradeURL,
    updatedUser
}
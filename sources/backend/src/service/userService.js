import db from "../models/index"

const createUser = async (steamid) => {

    try {
        const user = await db.Users.findOne({ where: { SteamID: steamid } });

        if (!user) {
            await db.Users.create({ SteamID: steamid });
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }

}
const getUsers = async () => {
    try {
        let users = []
        users = await db.Users.findAll({
            include: { model: db.Group_Users, attributes: ["Name"] }
        });
        if (users) {
            return {
                EM: "Get users success",
                EC: "0",
                DT: users
            }
        } else {
            return {
                EM: "Get users success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Get users error",
            EC: "-1",
            DT: []
        }
    }
}

const getTradeURL = async (steamid) => {
    try {
        let data = await db.Users.findOne({
            where: { SteamID: steamid },
            attributes: ['TradeURL'],
        })
        return {
            EM: "Get users success",
            EC: "0",
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Get user TradeURL error",
            EC: "-1",
            DT: []
        }
    }
}

const updatedTradeURL = async (id, TradeURL) => {

    try {
        if (typeof TradeURL === 'number') {
            await db.Users.update(
                { TradeURL: TradeURL },
                { where: { id: id } })
            return {
                EM: "Your trade is update",
                EC: "0",
                DT: ''
            }
        }
        else {
            return {
                EM: "Please, enter the number",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error update trade URL:', e)
        return {
            EM: "Update trade URL error",
            EC: "-1",
            DT: ''
        }
    }
}

const updateWallet = async (userid, addWallet) => {
    try {
        if (typeof parseFloat(addWallet) === 'number') {
            let getWallet = await db.Users.findOne({
                where: { id: userid },
                attributes: ['Wallet'],
            })
            let originWallet = getWallet.get({ plain: true }).Wallet
            let Wallet = parseFloat(addWallet) + parseFloat(originWallet)
            await db.Users.update(
                { Wallet: Wallet.toFixed(2) },
                { where: { id: userid } })
            return {
                EM: userid + " wallet is update",
                EC: "0",
                DT: ''
            }
        }
        else {
            return {
                EM: "Please, enter the number",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error update wallet:', e)
        return {
            EM: "Update wallet error",
            EC: "-1",
            DT: ''
        }
    }


}
const deleteUser = async (userid) => {
    try {
        await db.Users.destroy({
            where: {
                id: userid
            }
        })
        return {
            EM: userid + " deleted",
            EC: "0",
            DT: ''
        }
    } catch (e) {
        console.log('Error delete user:', e)
        return {
            EM: "Error delete user",
            EC: "-1",
            DT: ''
        }
    }
}
module.exports = {
    createUser,
    getUsers,
    deleteUser,
    getTradeURL,
    updatedTradeURL,
    updateWallet,
}
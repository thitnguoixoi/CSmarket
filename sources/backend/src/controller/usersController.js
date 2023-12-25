import userService from "../service/userService"

const readUsers = async (req, res) => {  // read all user controller
    try {
        let data = await userService.getUsers();
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

const readUser = async (req, res) => {  // read a single user controller
    try {
        let data = await userService.getUser(req.jwt.steamid);
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

const readUserSkins = async (req, res) => {  // read user skins controller
    try {
        let data = await userService.getUserSkins(req.jwt.steamid);
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

const updateTradeURL = async (req, res) => {  // update user's TradeURL controller
    try {
        let data = await userService.updateUserTradeURL(req.body.steamid, req.body.url)
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

const openCase = async (req, res) => {  // open case controller
    try {
        let data = await userService.openaCase(req.jwt.steamid, req.query.caseid)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const upgradeSkin = async (req, res) => {  // upgrade skin controller
    try {
        let data = await userService.upgradeUserSkin(req.jwt.steamid, req.body.userskinid, req.body.serverskinid)
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
const updateWallet = async (req, res) => {  // update user's wallet controller
    try {
        let data = await userService.updateUserWallet(req.body.id, req.body.walletValue)
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

const withdrawSkin = async (req, res) => {  // withdraw skin controller
    try {
        let data = await userService.withdrawUserSkin(req.jwt.steamid, req.body.userskinid)
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

const sellSkin = async (req, res) => {  //sell skin controller
    try {
        let data = await userService.sellUserSkin(req.jwt.steamid, req.body.userskinid)
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

const updateGroup = async (req, res) => {  // update group controller
    try {
        let data = await userService.updateUserGroup(req.body.id, req.body.groupid)
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

const deleteUser = async (req, res) => {  // delete a user controller
    try {
        let data = await userService.deleteUser(req.body.id, req.jwt.steamid)
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


const logoutUser = async (req, res) => {  // logout user controller
    try {
        res.clearCookie("jwt")
        res.clearCookie("csmarket")
        return res.status(200).json({
            EM: "User logout",
            EC: "0",
            DT: ""
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

const countUserQuantity = async (req, res) => {  // count user quantity controller
    try {
        let data = await userService.countUser()
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
const countUserOpened = async (req, res) => {  // count number of user opened controller
    try {
        let data = await userService.countOpened()
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
const countUserUpgraded = async (req, res) => {  // count number of user upgraded controller
    try {
        let data = await userService.countUpgraded()
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
    readUser,
    readUsers,
    updateTradeURL,
    updateWallet,
    deleteUser,
    updateGroup,
    readUserSkins,
    logoutUser,
    withdrawSkin,
    sellSkin,
    openCase,
    upgradeSkin,
    countUserQuantity,
    countUserOpened,
    countUserUpgraded,
}
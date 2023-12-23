import userService from "../service/userService"

const readUsers = async (req, res) => {
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

const readUser = async (req, res) => {
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

const readUserSkin = async (req, res) => {
    try {
        let data = await userService.getUserSkin(req.jwt.steamid);
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

const updateTradeURL = async (req, res) => {
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


const updateWallet = async (req, res) => {
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

const withdrawSkin = async (req, res) => {
    try {
        let data = await userService.withdrawUserSkin(req.jwt.steamid, req.body.skinid)
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

const sellSkin = async (req, res) => {
    try {
        let data = await userService.sellUserSkin(req.jwt.steamid, req.body.skinid)
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

const updateGroup = async (req, res) => {
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

const deleteUser = async (req, res) => {
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


const logoutUser = (req, res) => {
    try {
        res.clearCookie("jwt")
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
module.exports = {
    readUser,
    readUsers,
    updateTradeURL,
    updateWallet,
    deleteUser,
    updateGroup,
    readUserSkin,
    logoutUser,
    withdrawSkin,
    sellSkin
}
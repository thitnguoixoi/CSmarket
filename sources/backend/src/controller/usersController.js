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
        let data = await userService.getUser(req.body.steamid);
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
        let data = await userService.deleteUser(req.body.id)
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
    deleteUser
}
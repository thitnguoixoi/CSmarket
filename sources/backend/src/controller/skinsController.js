import skinService from "../service/skinService"
const createSkin = async (req, res) => {
    try {
        let data = await skinService.createaSkin(req.body.name, req.body.float, req.body.price, req.body.tier, req.body.image, req.body.count);
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
const readSkins = async (req, res) => {
    try {
        let data = await skinService.getSkins();
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

const readWithdrawSkins = async (req, res) => {
    try {
        let data = await skinService.getWithdrawSkins();
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



const updateSkin = async (req, res) => {
    try {
        let data = await skinService.updateaSkin(req.body.skinid, req.body.addcount);
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

const updateWithdrawSkin = async (req, res) => {
    try {
        let data = await skinService.updateaWithdrawSkin(req.body.skinid, req.body.isAccept);
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


const deleteSkin = async (req, res) => {
    try {
        console.log(req.body);
        let data = await skinService.deleteaSkin(req.body.skinid);
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
    readSkins,
    createSkin,
    updateSkin,
    deleteSkin,
    readWithdrawSkins,
    updateWithdrawSkin
}
import caseService from "../service/caseService"

const createCase = async (req, res) => {
    try {
        let data = await caseService.createaCase(req.body.name, req.body.price, req.body.image, req.body.groupname);
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

const createCaseSkins = async (req, res) => {
    try {
        let data = await caseService.createaCaseSkins(req.body.caseid, req.body.skinid, req.body.percent);
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

const readCases = async (req, res) => {
    try {
        let data = await caseService.getCases();
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

const readCasesSkins = async (req, res) => {
    try {
        let data = await caseService.getCasesSkins(req.query.caseid);
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

const updateCase = async (req, res) => {
    try {
        let data = await caseService.updateaCase(req.query.caseid, req.query.price);
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

const deleteCase = async (req, res) => {
    try {
        let data = await caseService.deleteaCase(req.query.caseid);
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

const deleteCaseSkins = async (req, res) => {
    try {
        let data = await caseService.deleteaCaseSkins(req.query.caseskinid);
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
    readCases,
    createCase,
    updateCase,
    deleteCase,
    readCasesSkins,
    createCaseSkins,
    deleteCaseSkins
}
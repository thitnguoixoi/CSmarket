import { where } from "sequelize";
import db from "../models/index"
const { Op } = require('sequelize');
const getCases = async () => {
    try {
        let cases = await db.Cases.findAll({
            include: { model: db.Group_Cases, attributes: ["Name"] }
        });
        if (cases) {
            return {
                EM: "Get cases success",
                EC: "0",
                DT: cases
            }
        } else {
            return {
                EM: "Get cases success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get cases error: ", e)
        return {
            EM: "Get cases error",
            EC: "-1",
            DT: []
        }
    }
}

const getGroupCases = async () => {
    try {

        let cases = await db.Group_Cases.findAll();
        if (cases) {
            return {
                EM: "Get group cases success",
                EC: "0",
                DT: cases
            }
        } else {
            return {
                EM: "Get group cases success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get cases error: ", e)
        return {
            EM: "Get cases error",
            EC: "-1",
            DT: []
        }
    }
}



const getCasesSkins = async (caseid) => {
    try {
        let skins = []

        let cases = await db.Cases.findOne({
            where: {
                id: caseid
            },
        });

        if (cases) {
            skins = await db.Cases_Skins.findAll({
                where: {
                    CaseID: caseid,
                },
                include: { model: db.Skins }
            });
            return {
                EM: "Get case's skin success",
                EC: "0",
                DT: {
                    skins, cases
                }

            }
        } else {
            return {
                EM: "Get case's skin success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Get case's skin error",
            EC: "-1",
            DT: []
        }
    }
}
const createaCase = async (name, price, image, groupname) => {
    try {
        let groupcases = await db.Group_Cases.findOne({
            where: {
                Name: groupname,
            }
        });
        if (groupcases) {
            await db.Cases.create({
                Name: name,
                Price: price,
                Image: image,
                GroupID: groupcases.get({ plain: true }).id,
            });
            return {
                EM: "Case created",
                EC: "0",
                DT: []
            }
        }
        else {
            await db.Group_Cases.create({
                Name: groupname
            });
            await db.Cases.create({
                Name: name,
                Price: price,
                Image: image,
                GroupID: groupid,
            });
            return {
                EM: "Case created",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Create case error: ", e)
        return {
            EM: "Create case error",
            EC: "-1",
            DT: []
        }
    }
}

const updateaCase = async (caseid, skinid, percent) => {
    try {
        let cases_skins = await db.Cases_Skins.findOne({
            where: {
                CaseID: caseid,
                SkinID: skinid
            }
        });
        const parsedValue = parseFloat(percent);
        const isFloat = !isNaN(parsedValue) && Number.isFinite(parsedValue) && Number(parsedValue) === parsedValue;
        if (!cases_skins && Number.isInteger(skinid) && isFloat) {
            await db.Cases_Skins.create({
                CaseID: caseid,
                SkinID: skinid
            });
            return {
                EM: "Update case success",
                EC: "0",
                DT: users
            }
        } else {
            return {
                EM: "Update case error",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Update case error: ", e)
        return {
            EM: "Update case error",
            EC: "-1",
            DT: []
        }
    }
}

const deleteaCase = async (caseid) => {
    try {
        let cases = await db.Cases.findOne({
            where: {
                id: caseid,
            }
        });
        if (cases) {
            await db.Cases.destroy({
                where: {
                    id: caseid
                }
            })
            return {
                EM: caseid + " deleted",
                EC: "0",
                DT: ''
            }
        }
        else {
            return {
                EM: "Can not delete this user",
                EC: "-1",
                DT: ''
            }
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
    getCases,
    createaCase,
    updateaCase,
    deleteaCase,
    getGroupCases,
    getCasesSkins
}
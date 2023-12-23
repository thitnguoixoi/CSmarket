import { where } from "sequelize";
import db from "../models/index"
const { Op } = require('sequelize');
const getCases = async () => {
    try {
        let cases = await db.Group_Cases.findAll({
            include: { model: db.Cases }
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

const getCasesSkins = async (caseid) => {
    try {
        let skins = []

        let acase = await db.Cases.findOne({
            where: {
                id: caseid
            },
        });

        if (acase) {
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
                    skins, acase
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
        let acase = await db.Cases.create({
            Name: name,
            Price: price,
            Image: image,
        });
        await db.Group_Cases.create({
            Name: groupname,
            CaseID: acase.get({ plain: true }).id
        });
        return {
            EM: "Case created",
            EC: "0",
            DT: []
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

const updateaCase = async (caseid, name, price, image, groupname) => {
    try {
        await db.Cases.update({
            Name: name,
            Price: price,
            Image: image,
        });
        await db.Group_Cases.update({
            Name: groupname,
            where: { CaseID: caseid, }
        });
        return {
            EM: "Update case success",
            EC: "0",
            DT: []
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

const updateaCaseSkins = async (caseid, skinid, percent) => {
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
                EM: "Update case's skin success",
                EC: "0",
                DT: users
            }
        } else {
            return {
                EM: "Update case's skin error",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Update case's skin error: ", e)
        return {
            EM: "Update case's skin error",
            EC: "-1",
            DT: []
        }
    }
}

const deleteaCase = async (caseid) => {
    try {
        let acase = await db.Cases.findOne({
            where: {
                id: caseid,
            }
        });
        if (acase) {
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
    updateaCaseSkins,
    getCasesSkins
}
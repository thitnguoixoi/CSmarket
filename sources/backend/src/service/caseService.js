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
                include: {
                    model: db.Skins,
                },
                attributes: ["id", "SkinID", "CaseID", "Percent"],
                order: [
                    ['Percent', 'ASC'],
                ],
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

const updateaCase = async (caseid, price) => {
    try {
        await db.Cases.update({
            Price: price,
        }, {
            where: { id: caseid, }
        }
        );
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

const createaCaseSkins = async (caseid, skinid, percent) => {
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
                SkinID: skinid,
                Percent: percent
            });
            return {
                EM: "Update case's skin success",
                EC: "0",
                DT: []
            }
        } else {
            return {
                EM: "Update case's skin error",
                EC: "-1",
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
            await db.Group_Cases.destroy({
                where: { CaseID: caseid, }
            });
            await db.Cases_Skins.destroy({
                where: { CaseID: caseid, }
            });
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
                EM: "Can not delete this case",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error delete case:', e)
        return {
            EM: "Error delete case",
            EC: "-1",
            DT: ''
        }
    }
}

const deleteaCaseSkins = async (caseskinid) => {
    try {
        let case_skin = await db.Cases_Skins.findOne({
            where: {
                id: caseskinid
            }
        });
        if (case_skin) {
            await db.Cases_Skins.destroy({
                where: {
                    id: caseskinid
                }
            });
            return {
                EM: "Skin in this case deleted",
                EC: "0",
                DT: ''
            }
        }
        else {
            return {
                EM: "Can not delete this skin",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error delete skin:', e)
        return {
            EM: "Error delete skin",
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
    createaCaseSkins,
    getCasesSkins,
    deleteaCaseSkins
}
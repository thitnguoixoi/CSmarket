import { where } from "sequelize";
import db from "../models/index"
const { Op } = require('sequelize');
const createaSkin = async (name, float, price, tier, image, count) => {  // create a skin with these attributes
    try {
        await db.Skins.create({
            Name: name,
            Float: float,
            Price: price,
            Tier: tier,
            Image: image,
            Count: count,
        });
        return {
            EM: "Skin created",
            EC: "0",
            DT: []
        }
    } catch (e) {
        console.log("Create skin error: ", e)
        return {
            EM: "Create skin error",
            EC: "-1",
            DT: []
        }
    }
}
const getSkins = async () => {  // get skin from database
    try {

        let skins = await db.Skins.findAll({
            order: [
                ['Price', 'ASC'],
            ],
        });
        if (skins) {
            return {
                EM: "Get skins success",
                EC: "0",
                DT: skins
            }
        } else {
            return {
                EM: "Get skins success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get skins error: ", e)
        return {
            EM: "Get skins error",
            EC: "-1",
            DT: []
        }
    }
}

const getWithdrawSkins = async () => {  // get the withdrawed skin
    try {
        let withdraws = await db.Users_Skins.findAll({
            where: {
                Status: "Withdraw"
            },
            attributes: ["id", "SkinID", "UserID"],
            include: [
                { model: db.Users, attributes: ['SteamID', 'TradeURL'] },
                { model: db.Skins, attributes: ['Name', 'Float'] }
            ]
        });
        if (withdraws) {
            return {
                EM: "Get withdraw skins success",
                EC: "0",
                DT: withdraws
            }
        } else {
            return {
                EM: "Get withdraw skins error",
                EC: "-1",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get withdraw skins error: ", e)
        return {
            EM: "Get withdraw skins error",
            EC: "-1",
            DT: []
        }
    }
}

const updateaSkin = async (skinid, addcount) => {  // update a skin
    try {
        let skin = await db.Skins.findOne({
            where: {
                id: skinid,
            }
        });
        if (skin && Number.isInteger(addcount)) {
            let originCount = skin.get({ plain: true }).Count
            let count = parseInt(addcount) + parseInt(originCount)
            await db.Skins.update(
                { Count: count },
                { where: { id: skinid } })
            return {
                EM: "Update skin success",
                EC: "0",
                DT: []
            }
        } else {
            return {
                EM: "Update skin error",
                EC: "-1",
                DT: []
            }
        }
    } catch (e) {
        console.log("Update skin error: ", e)
        return {
            EM: "Update skin error",
            EC: "-1",
            DT: []
        }
    }
}

const updateaWithdrawSkin = async (withdrawskinid, isAccept) => {  // update withdraw skin
    try {
        let withdraw = await db.Users_Skins.findOne({
            where: {
                id: withdrawskinid
            },
            include: [
                { model: db.Skins, attributes: ['id', 'Count'] }
            ]
        });

        if (withdraw && isAccept == 1) {
            let count = parseInt(withdraw.get({ plain: true }).Skin.Count) + 1;
            await db.Skins.update(
                { Count: count },
                { where: { id: withdraw.get({ plain: true }).Skin.id }, }
            );
            await db.Users_Skins.destroy({
                where: {
                    id: withdrawskinid
                },
            });
            return {
                EM: "Update withdraw skin success",
                EC: "0",
                DT: []
            }
        } else if (withdraw && isAccept == 0) {
            return {
                EM: "Update withdraw skin success",
                EC: "0",
                DT: []
            }
        } else if (!withdraw) {
            return {
                EM: "Update withdraw skin error",
                EC: "-1",
                DT: []
            }
        }
    } catch (e) {
        console.log("Update withdraw skin error: ", e)
        return {
            EM: "Update withdraw skin error",
            EC: "-1",
            DT: []
        }
    }
}

const deleteaSkin = async (skinid) => {  // delete a skin
    try {
        let skin = await db.Skins.findOne({
            where: {
                id: skinid,
            }
        });
        if (skin) {
            await db.Cases_Skins.destroy({
                where: {
                    SkinID: skinid
                }
            })
            await db.Skins.destroy({
                where: {
                    id: skinid
                }
            })
            return {
                EM: skinid + " deleted",
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
    getSkins,
    createaSkin,
    updateaSkin,
    deleteaSkin,
    updateaWithdrawSkin,
    getWithdrawSkins
}
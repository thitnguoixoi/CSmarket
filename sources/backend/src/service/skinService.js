import { where } from "sequelize";
import db from "../models/index"
const { Op } = require('sequelize');
const getSkins = async () => {
    try {

        let skins = await db.Skins.findAll();
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

const createaSkin = async (name, float, price, tier, image, count) => {
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

const updateaSkin = async (skinid, addcount) => {
    try {
        let skin = await db.Skins.findOne({
            id: skinid,
        });
        if (skin && parseInt(addcount) == "number") {
            let originCount = skin.get({ plain: true }).Count
            let count = parseInt(addWallet) + parseInt(originCount)
            await db.Users.update(
                { Count: count },
                { where: { id: skinid } })
            return {
                EM: "Update skin success",
                EC: "0",
                DT: users
            }
        } else {
            return {
                EM: "Update skin error",
                EC: "0",
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

const deleteaSkin = async (skinid) => {
    try {
        let skin = await db.Skins.findOne({
            id: skinid,
        });
        if (skin) {
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
    deleteaSkin
}
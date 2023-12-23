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

const createaSkin = async () => {
    try {
        let users = []
        users = await db.Users.findAll({
            include: { model: db.Group_Users, attributes: ["Name"] }
        });
        if (users) {
            return {
                EM: "Get users success",
                EC: "0",
                DT: users
            }
        } else {
            return {
                EM: "Get users success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get users error: ", e)
        return {
            EM: "Get users error",
            EC: "-1",
            DT: []
        }
    }
}

const updateaSkin = async () => {
    try {
        let users = []
        users = await db.Users.findAll({
            include: { model: db.Group_Users, attributes: ["Name"] }
        });
        if (users) {
            return {
                EM: "Get users success",
                EC: "0",
                DT: users
            }
        } else {
            return {
                EM: "Get users success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get users error: ", e)
        return {
            EM: "Get users error",
            EC: "-1",
            DT: []
        }
    }
}

const deleteaSkin = async () => {
    try {
        let users = []
        users = await db.Users.findAll({
            include: { model: db.Group_Users, attributes: ["Name"] }
        });
        if (users) {
            return {
                EM: "Get users success",
                EC: "0",
                DT: users
            }
        } else {
            return {
                EM: "Get users success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get users error: ", e)
        return {
            EM: "Get users error",
            EC: "-1",
            DT: []
        }
    }
}

module.exports = {
    getSkins,
    createaSkin,
    updateaSkin,
    deleteaSkin
}
import { where } from "sequelize";
import db from "../models/index"
const { Op } = require('sequelize');


const createUser = async (steamid, personaname, profileurl, avatar, avatarmedium, avatarfull) => {
    try {
        const user = await db.Users.findOne({ where: { SteamID: steamid } });

        if (!user) {
            await db.Users.create({
                SteamID: steamid,
                Personaname: personaname,
                Profileurl: profileurl,
                Avatar: avatar,
                Avatarmedium: avatarmedium,
                Avatarfull: avatarfull,
            });
        }
        else {
            await db.Users.update(
                {
                    Personaname: personaname,
                    Profileurl: profileurl,
                    Avatar: avatar,
                    Avatarmedium: avatarmedium,
                    Avatarfull: avatarfull,
                },
                { where: { SteamID: steamid } })
        }
    } catch (error) {
        console.error('Error creating user: ', error);
    }
}

const getUsers = async () => {
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

const getUser = async (steamid) => {
    try {
        let user = []
        user = await db.Users.findOne({
            where: {
                SteamID: steamid
            },
            include: { model: db.Group_Users, attributes: ["Name"] }
        });
        if (user) {
            return {
                EM: "Get user success",
                EC: "0",
                DT: user
            }
        } else {
            return {
                EM: "Get user success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log("Get user error: ", e)
        return {
            EM: "Get user error",
            EC: "-1",
            DT: []
        }
    }
}

const getUserSkins = async (steamid) => {
    try {
        let skins = []

        let user = await db.Users.findOne({
            where: {
                SteamID: steamid
            },
        });
        skins = await db.Users_Skins.findAll({
            where: {
                UserID: user.get({ plain: true }).id,
                Status: {
                    [Op.notIn]: ["Withdraw"]
                }
            },
            include: { model: db.Skins }
        });
        if (skins) {
            return {
                EM: "Get user's skin success",
                EC: "0",
                DT: skins
            }
        } else {
            return {
                EM: "Get user's skin success",
                EC: "0",
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Get user's skin error",
            EC: "-1",
            DT: []
        }
    }
}

const getTradeURL = async (steamid) => {
    try {
        let data = await db.Users.findOne({
            where: { SteamID: steamid },
            attributes: ['TradeURL'],
        })
        return {
            EM: "Get users success",
            EC: "0",
            DT: data
        }
    } catch (e) {
        console.log("Get user TradeURL error: ", e)
        return {
            EM: "Get user TradeURL error",
            EC: "-1",
            DT: []
        }
    }
}

const updateUserTradeURL = async (steamid, TradeURL) => {
    try {
        if (typeof TradeURL === 'string') {
            await db.Users.update(
                { TradeURL: TradeURL },
                { where: { SteamID: steamid } })
            return {
                EM: "Your trade is update",
                EC: "0",
                DT: ''
            }
        }
        else {
            return {
                EM: "Please, enter the string",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error update trade URL: ', e)
        return {
            EM: "Update trade URL error",
            EC: "-1",
            DT: ''
        }
    }
}


const withdrawUserSkin = async (steamid, skinid) => {
    try {

        let skins = await db.Skins.findOne({
            where: {
                id: skinid
            },
        });

        if (skins.get({ plain: true }).Count != 0) {

            let user = await db.Users.findOne({
                where: {
                    SteamID: steamid
                },
            });

            await db.Users_Skins.update(
                { Status: "Withdraw" },
                {
                    where: {
                        UserID: user.get({ plain: true }).id,
                        SkinID: skinid
                    }
                })

            return {
                EM: "Waiting for sending to user",
                EC: "0",
                DT: ''
            }

        } else {

            return {
                EM: "We didn't have this skin",
                EC: "-1",
                DT: ''
            }

        }
    } catch (e) {
        console.log('Withdraw skin error: ', e)
        return {
            EM: "Withdraw skin error",
            EC: "-1",
            DT: ''
        }
    }
}

const sellUserSkin = async (steamid, skinid) => {
    try {
        let user = await db.Users.findOne({
            where: {
                SteamID: steamid
            },
        });
        let userskin = await db.Users_Skins.findOne({
            where: {
                UserID: user.get({ plain: true }).id,
                SkinID: skinid
            },
        });
        if (userskin) {
            let originWallet = user.get({ plain: true }).Wallet

            let skin = await db.Skins.findOne({
                where: {
                    id: skinid
                },
            });

            let addWallet = skin.get({ plain: true }).Price

            let Wallet = parseFloat(addWallet) + parseFloat(originWallet)

            await db.Users.update(
                { Wallet: Wallet.toFixed(2) },
                { where: { id: user.get({ plain: true }).id } }
            )


            await db.Users_Skins.destroy(
                {
                    where: {
                        UserID: user.get({ plain: true }).id,
                        SkinID: skinid
                    }
                }
            )
            return {
                EM: "User skin is selled",
                EC: "0",
                DT: ''
            }
        } else {
            return {
                EM: "Error sell user skin",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error sell user skin: ', e)
        return {
            EM: "Error sell user skin",
            EC: "-1",
            DT: ''
        }
    }
}

const updateUserWallet = async (userid, addWallet) => {
    try {
        let user = await db.Users.findOne({
            where: { id: userid },
        })
        const parsedValue = parseFloat(addWallet);
        const isFloat = !isNaN(parsedValue) && Number.isFinite(parsedValue) && Number(parsedValue) === parsedValue;
        if (isFloat && user) {
            let originWallet = user.get({ plain: true }).Wallet
            let wallet = parseFloat(addWallet) + parseFloat(originWallet)
            await db.Users.update(
                { Wallet: wallet.toFixed(2) },
                { where: { id: userid } })
            return {
                EM: userid + "'s wallet is update",
                EC: "0",
                DT: ''
            }
        }
        else {
            return {
                EM: "Please, enter the number",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error update wallet:', e)
        return {
            EM: "Update wallet error",
            EC: "-1",
            DT: ''
        }
    }
}

const updateUserGroup = async (userid, groupid) => {
    try {
        if (groupid == 1 || groupid == 2 || groupid == 3) {

            await db.Users.update(
                { GroupID: groupid },
                { where: { id: userid } }
            )
            return {
                EM: userid + "'s group is update",
                EC: "0",
                DT: ''
            }
        }
        else {
            return {
                EM: "Please, enter the group-id",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error update wallet:', e)
        return {
            EM: "Update user's group error",
            EC: "-1",
            DT: ''
        }
    }
}

const deleteUser = async (userid, steamid) => {
    try {
        let user = await db.Users.findOne({
            where: { id: userid }
        })
        if (user && user.SteamID !== steamid) {
            await db.Users.destroy({
                where: {
                    id: userid
                }
            })
            return {
                EM: userid + " deleted",
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

const openaCase = async (steamid, caseid) => {
    try {

        let acase = await db.Cases.findOne({
            where: { id: caseid }
        })
        if (acase) {
            let skins = await db.Cases_Skins.findAll({
                where: {
                    CaseID: caseid,
                },
                include: {
                    model: db.Skins,
                    attributes: ["Image"]
                },
                order: [
                    ['Percent', 'ASC'],
                ],
            });
            if (skins) {
                const numberOfSkins = skins.length;
                let index = 0;
                const randomValue = Math.random();
                let skinopened = []
                skins.every((skin) => {
                    index += 1
                    if (index == numberOfSkins) {
                        skinopened = skin.get({ plain: true })
                        return false;
                    }
                    else if (randomValue <= skin.get({ plain: true }).Percent) {
                        skinopened = skin.get({ plain: true })
                        return false;
                    }
                    return true;
                });

                user = await db.User.findOne(
                    { SteamID: steamid },
                )

                await db.Users_Skins.create(
                    {
                        UserID: user.get({ plain: true }).id,
                        SkinID: skinopened.SkinID,
                        Status: "Inventory"
                    },
                )
                let originWallet = user.get({ plain: true }).Wallet
                let caseprice = acase.get({ plain: true }).Price
                let wallet = parseFloat(originWallet) - parseFloat(caseprice)

                await db.Users.update(
                    { Wallet: wallet.toFixed(2) },
                    { where: { id: userid } })

                return {
                    EM: "Case opened",
                    EC: "0",
                    DT: ""
                }
            } else {
                return {
                    EM: "Can not open this case",
                    EC: "-1",
                    DT: ''
                }
            }
        }
        else {
            return {
                EM: "Can not open this case",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Error open case:', e)
        return {
            EM: "Error open case",
            EC: "-1",
            DT: ''
        }
    }
}
const upgradeUserSkin = async (userskinid, serverskinid) => {
    try {
        if (userskin && serverskin) {
            await db.Users.destroy({
                where: {
                    id: userid
                }
            })
            return {
                EM: userid + " deleted",
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
    getUser,
    createUser,
    getUsers,
    deleteUser,
    getTradeURL,
    updateUserTradeURL,
    updateUserWallet,
    updateUserGroup,
    getUserSkins,
    withdrawUserSkin,
    sellUserSkin,
    openaCase,
    upgradeUserSkin,
}
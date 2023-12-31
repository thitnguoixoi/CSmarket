import { where } from "sequelize";
import db from "../models/index"
const { Op } = require('sequelize');


const createUser = async (steamid, personaname, profileurl, avatar, avatarmedium, avatarfull) => {  // create user when they loggin in via steam
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

const getUsers = async () => {  // get all user from database
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

const getUser = async (steamid) => {  // get a single user
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

const getUserSkins = async (steamid) => {  // get user's skin
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
            attributes: ["id", "SkinID", "UserID"],
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

const getTradeURL = async (steamid) => {  // get user's TradeURL
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

const updateUserTradeURL = async (steamid, TradeURL) => {  // update user's TradeURL
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


const withdrawUserSkin = async (steamid, userskinid) => {  // withdraw user's skin
    try {
        let userskin = await db.Users_Skins.findOne({
            where: {
                id: userskinid
            },
        });
        if (userskin) {

            let skins = await db.Skins.findOne({
                where: {
                    id: userskin.get({ plain: true }).SkinID
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
                            id: userskinid
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

const sellUserSkin = async (steamid, userskinid) => {  // sell user's skin
    try {
        let user = await db.Users.findOne({
            where: {
                SteamID: steamid
            },
        });
        let userskin = await db.Users_Skins.findOne({
            where: {
                id: userskinid
            },
        });
        if (userskin) {
            let originWallet = user.get({ plain: true }).Wallet

            let skin = await db.Skins.findOne({
                where: {
                    id: userskin.SkinID
                },
            });

            let addWallet = skin.get({ plain: true }).Price

            let Wallet = parseFloat(addWallet) + parseFloat(originWallet)  // new wallet = old wallet + skin's price

            await db.Users.update(
                { Wallet: Wallet.toFixed(2) },
                { where: { id: user.get({ plain: true }).id } }
            )


            await db.Users_Skins.destroy(  // delete user's skin
                {
                    where: {
                        id: userskinid
                    }
                }
            )
            return {
                EM: "User skin is selled",
                EC: "0",
                DT: ''
            }
        } else {  // skin didnt exist
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

const updateUserWallet = async (userid, addWallet) => {  // update user's wallet
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

const updateUserGroup = async (userid, groupid) => {  //uddate user group
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

const deleteUser = async (userid, steamid) => {  // delete a user from database
    try {
        let user = await db.Users.findOne({
            where: { id: userid }
        })
        let userskins = await db.Users_Skins.findOne({
            where: { id: userid }
        })
        if (user && user.SteamID !== steamid && !userskins) {
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

const openaCase = async (steamid, caseid) => {  // open a case
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
                    attributes: ["Image", "Name", "Float", "Tier"]
                },
                order: [
                    ['Percent', 'ASC'],
                ],
            });
            if (skins.length != 0) {
                let user = await db.Users.findOne({
                    where:
                        { SteamID: steamid },
                })
                let originWallet = user.get({ plain: true }).Wallet
                let caseprice = acase.get({ plain: true }).Price
                if (originWallet >= caseprice) {  // check if user's wallet is valid
                    const numberOfSkins = skins.length;
                    const randomValue = Math.random();  // random opening
                    let index = 0;
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



                    await db.Users_Skins.create(
                        {
                            UserID: user.get({ plain: true }).id,
                            SkinID: skinopened.SkinID,
                            Status: "Inventory"
                        },
                    )
                    let wallet = parseFloat(originWallet) - parseFloat(caseprice)  // update user's wallet
                    let originOpen = user.get({ plain: true }).CountOpen
                    let open = parseInt(originOpen) + 1
                    await db.Users.update(
                        {
                            Wallet: wallet.toFixed(2),
                            CountOpen: open
                        },
                        { where: { id: user.get({ plain: true }).id, } })
                    return {
                        EM: "Case opened",
                        EC: "0",
                        DT: skinopened
                    }
                }
                else {  // not enough money
                    return {
                        EM: "Can not open this case",
                        EC: "-1",
                        DT: ''
                    }
                }

            } else if (skins.length == 0) {  // case have no skin
                return {
                    EM: "Can not open this case",
                    EC: "-1",
                    DT: ''
                }
            }
        }
        else {
            return {  // no case
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
const upgradeUserSkin = async (steamid, userskinid, serverskinid) => {  // upgrade user's skin
    try {
        let user = await db.Users.findOne({
            where:
                { SteamID: steamid },
        }
        )
        let userskin = await db.Users_Skins.findOne({
            where: {
                id: userskinid
            },
            include: {
                model: db.Skins, attributes: ["Price"]
            }
        })
        let serverskin = await db.Skins.findOne({
            where: {
                id: serverskinid
            }
        })
        let userskinprice = parseFloat(userskin.get({ plain: true }).Skin.Price)
        let serverskinprice = parseFloat(serverskin.get({ plain: true }).Price)
        if (userskin && serverskin && userskinprice < serverskinprice) {
            let percent = userskinprice / serverskinprice  // success rate
            const randomValue = Math.random();
            let originUpgrade = user.get({ plain: true }).CountUpgrade
            let upgrade = parseInt(originUpgrade) + 1
            if (randomValue <= percent) {  // success
                await db.Users_Skins.update(
                    { SkinID: serverskinid },
                    {
                        where: {
                            id: userskinid,
                        }
                    },
                )
                await db.Users.update(
                    {
                        CountUpgrade: upgrade
                    },
                    { where: { id: user.get({ plain: true }).id, } })
                return {
                    EM: "Skin upgraded success",
                    EC: "0",
                    DT: ""
                }
            }
            else if (randomValue > percent) {  // failed
                await db.Users_Skins.destroy({
                    where: {
                        id: userskinid,
                    },
                })
                await db.Users.update(
                    {
                        CountUpgrade: upgrade
                    },
                    { where: { id: user.get({ plain: true }).id, } })
                return {
                    EM: "Skin upgraded fail",
                    EC: "0",
                    DT: ""
                }
            }
        }
        else {
            return {
                EM: "Can not upgrade this skin",
                EC: "-1",
                DT: ''
            }
        }
    } catch (e) {
        console.log('Can not upgrade this skin:', e)
        return {
            EM: "Can not upgrade this skin",
            EC: "-1",
            DT: ''
        }
    }
}
const countOpened = async () => { // Count user opened
    try {
        let count

        await db.Users.sum('CountOpen').then(totalCountOpen => {
            count = totalCountOpen; // Gán tổng vào biến count
        }).catch(err => {
            console.error('Get user opened error:', err);
        });

        return {
            EM: "Get user opened success",
            EC: "-1",
            DT: count
        }
    } catch (e) {
        console.log('Get user opened error:', e)
        return {
            EM: "Get user opened error",
            EC: "-1",
            DT: ''
        }
    }
}
const countUpgraded = async () => {// Count user upgraded
    try {
        let count

        await db.Users.sum('CountUpgrade').then(totalCountUpgrade => {
            count = totalCountUpgrade; // Gán tổng vào biến count
        }).catch(err => {
            console.error('Get user opened error:', err);
        });

        return {
            EM: "Get user opened success",
            EC: "-1",
            DT: count
        }
    } catch (e) {
        console.log('Get user opened error:', e)
        return {
            EM: "Get user opened error",
            EC: "-1",
            DT: ''
        }
    }
}
const countUser = async () => {// Count user
    try {
        let count

        await db.Users.count().then(userCount => {
            count = userCount;
        }).catch(err => {
            console.error('Get user opened error', err);
        });

        return {
            EM: "Get user opened success",
            EC: "-1",
            DT: count
        }
    } catch (e) {
        console.log('Get amount of user error:', e)
        return {
            EM: "Get amount of user error",
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
    countOpened,
    countUpgraded,
    countUser
}

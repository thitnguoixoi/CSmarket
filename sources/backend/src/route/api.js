import express from "express";
import loginController from "../controller/loginController"
import casesController from "../controller/casesController"
import skinsController from "../controller/skinsController"
import usersController from "../controller/usersController"
import { checkUserJWT, checkUserPermisson } from "../middleware/jwtactions"
let router = express.Router();
let initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermisson,);

    /*
    login
    */

    //everyone
    router.get('/auth/steam', loginController.handleSteamAuth);//, loginController.redirectHome
    router.get('/auth/steam/return', loginController.handleSteamReturn, loginController.handleSendProfile);
    router.get('/jwt/steamid', loginController.getJWT);
    router.get("/users/logout", usersController.logoutUser);

    router.get("/users/quantity", usersController.countUserQuantity);
    router.get("/users/opened/quantity", usersController.countUserOpened);
    router.get("/users/upgraded/quantity", usersController.countUserUpgraded);

    /*
    Actions affect users
    */

    //user, trader, admin - 7
    router.get("/users/steamid", usersController.readUser);
    router.put("/users/tradeurl", usersController.updateTradeURL);
    router.get("/users/cases/open", usersController.openCase) // caseid

    router.get("/users/skins", usersController.readUserSkins)

    router.put("/users/skins/withdraw", usersController.withdrawSkin)

    router.put("/users/skins/sell", usersController.sellSkin)

    router.put("/users/skins/upgrade", usersController.upgradeSkin) //userskinid, serverskinid

    //admin - 4
    router.get("/users", usersController.readUsers);
    router.put("/users/wallet", usersController.updateWallet);
    router.delete("/users", usersController.deleteUser);
    router.put("/users/group", usersController.updateGroup);

    /*
    Actions affect skins in database
    */

    //trader, admin - 2
    //Get skins data, user want to withdraw
    router.get("/skins/withdraw", skinsController.readWithdrawSkins);

    router.put("/skins/withdraw", skinsController.updateWithdrawSkin); //withdrawid, isAccept

    //user, trader, admin - 3
    router.get("/skins", skinsController.readSkins);

    //admin - 3
    router.post("/skins", skinsController.createSkin);
    router.put("/skins", skinsController.updateSkin);
    router.delete("/skins", skinsController.deleteSkin);

    /*
    Actions affect cases in database
    */

    //everyone
    router.get("/cases", casesController.readCases);
    router.get("/cases/skins", casesController.readCasesSkins); //caseid

    //admin - 5
    router.post("/cases", casesController.createCase); //name, price, image, groupname
    router.put("/cases", casesController.updateCase); //caseid, price
    router.post("/cases/skins", casesController.createCaseSkins); //caseskinid, percent
    router.delete("/cases/skins", casesController.deleteCaseSkins); //caseskinid
    router.delete("/cases", casesController.deleteCase); //caseid

    return app.use("/api/v1", router);
}
module.exports = initApiRoutes;
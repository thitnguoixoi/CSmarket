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

    /*
    Actions affect users
    */

    //user, trader, admin - 8
    router.get("/users", usersController.readUsers);
    router.get("/users/steamid", usersController.readUser);
    router.put("/users/tradeurl/update", usersController.updateTradeURL);
    router.get("/users/skins", usersController.readUserSkins)
    router.put("/users/skins/withdraw", usersController.withdrawSkin)
    router.put("/users/skins/sell", usersController.sellSkin)
    router.get("/users/cases/open", usersController.openCase) // caseid
    router.put("/users/skins/upgrade", usersController.upgradeSkin) //userskinid, serverskinid

    //admin - 3
    router.put("/users/wallet/update", usersController.updateWallet);
    router.delete("/users/delete", usersController.deleteUser);
    router.put("/users/group/update", usersController.updateGroup);

    /*
    Actions affect skins in database
    */

    //trader, admin - 2
    router.get("/skins/withdraw", skinsController.readWithdrawSkins);
    router.put("/skins/withdraw/update", skinsController.updateWithdrawSkin); //withdrawid, isAccept

    //user, trader, admin - 3
    router.get("/skins", skinsController.readSkins);

    //admin - 3
    router.post("/skins/create", skinsController.createSkin);
    router.put("/skins/update", skinsController.updateSkin);
    router.delete("/skins/delete", skinsController.deleteSkin);

    /*
    Actions affect cases in database
    */

    //everyone
    router.get("/cases", casesController.readCases);
    router.get("/cases/id", casesController.readCasesSkins); //caseid

    //admin - 5
    router.post("/cases/create", casesController.createCase); //name, price, image, groupname
    router.put("/cases/update", casesController.updateCase); //caseid, price
    router.post("/cases/skins/create", casesController.createCaseSkins); //caseskinid, percent
    router.delete("/cases/skins/delete", casesController.deleteCaseSkins); //caseskinid
    router.delete("/cases/delete", casesController.deleteCase); //caseid

    return app.use("/api/v1", router);
}
module.exports = initApiRoutes;
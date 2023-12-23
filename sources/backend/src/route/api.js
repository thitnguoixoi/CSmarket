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

    /*
    Actions affect users
    */

    //user, trader, admin
    router.get("/users", usersController.readUsers);

    router.get("/users/logout", usersController.logoutUser);

    router.get("/users/steamid", usersController.readUser);

    router.put("/users/tradeurl/update", usersController.updateTradeURL);

    router.get("/users/skins", usersController.readUserSkins)

    router.put("/users/skins/withdraw", usersController.withdrawSkin)

    router.put("/users/skins/sell", usersController.sellSkin)

    router.put("/users/opencase", usersController.openCase) //ch làm

    router.put("/users/upgrade", usersController.upgradeSkin) //ch làm

    //admin
    router.put("/users/update/wallet", usersController.updateWallet);

    router.delete("/users/delete", usersController.deleteUser);

    router.put("/users/update/group", usersController.updateGroup);

    /*
    Actions affect skins in database
    */
    //trader, admin
    router.put("/skins/withdraw/update", skinsController.updateSkin);

    //admin
    router.get("/skins", skinsController.readSkins);

    router.post("/skins/create", skinsController.createSkin);

    router.put("/skins/update", skinsController.updateSkin);

    router.delete("/skins/delete", skinsController.deleteSkin);

    /*
    Actions affect cases in database
    */

    //user, trader, admin

    router.get("/cases", casesController.readCases);

    router.get("/cases/id", casesController.readCasesSkins);

    //admin
    router.post("/cases/create", casesController.createCase);

    router.put("/cases/update", casesController.updateCase);

    router.put("/cases/skins/update", casesController.updateCaseSkins);

    router.delete("/cases/delete", casesController.deleteCase);

    /*
        Actions affect withdraw skin in database
    */

    return app.use("/api/v1", router);
}
module.exports = initApiRoutes;
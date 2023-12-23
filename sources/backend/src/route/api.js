import express from "express";
import loginController from "../controller/loginController"
import casesController from "../controller/casesController"
import skinsController from "../controller/skinsController"
import usersController from "../controller/usersController"
import { checkUserJWT, checkUserPermisson } from "../middleware/jwtactions"
let router = express.Router();
let initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermisson,);

    //everyone
    router.get('/auth/steam', loginController.handleSteamAuth);//, loginController.redirectHome
    router.get('/auth/steam/return', loginController.handleSteamReturn, loginController.handleSendProfile);
    router.get('/jwt/steamid', loginController.getJWT);

    //user, trader, admin
    router.get("/users", usersController.readUsers);

    router.get("/users/logout", usersController.logoutUser);

    router.get("/users/steamid", usersController.readUser);

    router.put("/users/update/tradeurl", usersController.updateTradeURL);

    router.get("/users/skin", usersController.readUserSkin)

    // router.put("/users/skin/withdraw", usersController.withdrawSkin) //ch làm

    // router.put("/users/skin/sell", usersController.sellSkin) //ch làm

    // router.put("/users/opencase", usersController.openCase) //ch làm

    //admin
    router.put("/users/update/wallet", usersController.updateWallet);

    router.delete("/users/delete", usersController.deleteUser);

    router.put("/users/update/group", usersController.updateGroup); // id, groupid




    // router.get("/skins", skinsController.testAPI);
    // router.post("/skins", skinsController.testAPI);
    // router.put("/skins", skinsController.testAPI);
    // router.delete("/skins", skinsController.testAPI);

    // router.get("/cases", casesController.testAPI);
    // router.post("/cases", casesController.testAPI);
    // router.put("/cases", casesController.testAPI);
    // router.delete("/cases", casesController.testAPI);

    return app.use("/api/v1", router);
}
module.exports = initApiRoutes;
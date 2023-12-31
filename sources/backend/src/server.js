import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initApiRoutes from "./route/api"
import passport from "./config/passport";
import cookieParser from "cookie-parser"
import configCORS from "./config/cors"
require('dotenv').config();
let app = express();
// config CORS for server
configCORS(app)
// config parser for server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// add view engine for server
viewEngine(app);
// config cookie parser for server
app.use(cookieParser())
// config passport for server
passport(app);
// config steamp OAuth for server
require("./config/steamapi")(app);
// config routes for server
initApiRoutes(app);


// run server in port 8080
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port " + port)
})
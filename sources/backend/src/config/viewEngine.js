import express from "express";
//config view engine
let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/view");
}
module.exports = configViewEngine;
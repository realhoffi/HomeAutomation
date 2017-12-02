import express = require("express");
export function registerRoutes(router: express.Router) {
    router.route("/bears").get(function (req, res) {
        req.app.locals.test -= 5;
        res.json([{ "ID": "1" }, req.app.locals, req.app.get("test")]);
    });

    router.route("/tears").get(function (req, res) {
        req.app.locals.test += 100;
        res.json([{ "ID": "2" }, req.app.locals]);
    });
}
import express = require("express");
export function registerRoutes(router: express.Router) {
    router.route("/bears").get(function (req, res) {
        res.json([{ "ID": "1" }]);
    });

    router.route("/tears").get(function (req, res) {
        res.json([{ "ID": "2" }]);
    });
}
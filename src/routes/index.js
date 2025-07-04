import express from "express";
import videos from "./videosRoutes.js";
import categorias from "./categoriaRoutes.js";
import cadastro from "./cadastroRoutes.js"
import login from "./loginRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("AluraFlix");
    })

    app.use(
        express.json(), 
        videos,
        categorias,
        cadastro,
        login
    );
};

export default routes;
import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const routes = express.Router();

routes
    .post("/login", UsuarioController.autenticarUsuario)

export default routes;
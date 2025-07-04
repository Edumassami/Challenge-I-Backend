import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const routes = express.Router();

routes
    .post("/cadastro", UsuarioController.cadastrarUsuario)
    .put("/cadastro/:id", UsuarioController.atualizarCadastro)
    .delete("/cadastro/:id", UsuarioController.excluirCadastro)

export default routes;
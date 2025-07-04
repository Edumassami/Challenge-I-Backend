import express from "express";
import CategoriaController from "../controllers/categoriaController.js";
import paginar from "../middlewares/paginar.js";
import autorizarUsuario from "../middlewares/autorizarUsuario.js";

const routes = express.Router();

routes
    .get("/categorias", autorizarUsuario, CategoriaController.listarCategorias, paginar)
    .get("/categorias/:id", autorizarUsuario, CategoriaController.buscarCategoriaPorId)
    .get("/categorias/:id/videos", autorizarUsuario, CategoriaController.listarVideosPorCategoria, paginar)
    .post("/categorias", autorizarUsuario, CategoriaController.cadastrarCategoria)
    .put("/categorias/:id", autorizarUsuario, CategoriaController.atualizarCategoria)
    .delete("/categorias/:id", autorizarUsuario, CategoriaController.excluirCategoria)

export default routes;


import express from "express";
import VideoController from "../controllers/videoController.js";
import paginar from "../middlewares/paginar.js";
import autorizarUsuario from "../middlewares/autorizarUsuario.js";

const routes = express.Router();

routes
    .get("/videos", autorizarUsuario, VideoController.listarVideos, paginar)
    .get("/videos/free", VideoController.listarVideosGratis)
    .get("/videos/busca", autorizarUsuario, VideoController.listarVideosPorFiltro, paginar)
    .get("/videos/:id", autorizarUsuario, VideoController.buscarVideoPorId)
    .post("/videos", autorizarUsuario, VideoController.cadastrarVideo)
    .put("/videos/:id", autorizarUsuario, VideoController.atualizarVideo)
    .delete("/videos/:id", autorizarUsuario, VideoController.excluirVideo)

export default routes;


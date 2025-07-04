import NaoEncontrado from "../erros/NaoEncontrado.js";
import { categoria, video } from "../models/index.js";

class CategoriaController {

    static async listarCategorias(req, res, next) {
        try {
            const listaCategorias = categoria.find({});

            req.resultado = listaCategorias

            next();
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarCategoriaPorId(req, res, next) {
        try {
            let id = req.params.id;
            const categoriaEncontrada = await categoria.findById(id);

            if (categoriaEncontrada !== null) {
                res.status(200).json(categoriaEncontrada);
            } else {
                next(new NaoEncontrado("Id da Categoria não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarCategoria(req, res, next) {
        try {
            const novaCategoria = await categoria.create(req.body);

            res.status(200).json({ message: "Categoria criada com sucesso", video: novaCategoria });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarCategoria(req, res, next) {
        try {
            let id = req.params.id;
            const categoriaEncontrada = await categoria.findByIdAndUpdate(id, {$set: req.body })
            if (categoriaEncontrada !== null) {
                res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
            } else {
                next(new NaoEncontrado("Id da Categoria não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async excluirCategoria(req, res, next) {
        try {
            let id = req.params.id;
            const categoriaEncontrada = await categoria.findByIdAndDelete(id)
            if (categoriaEncontrada !== null) {
                res.status(200).json({ message: 'Categoria excluída com sucesso!' });
            } else {
                next(new NaoEncontrado("Id da Categoria não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async listarVideosPorCategoria(req, res, next) {
        try{
            let id = req.params.id;
            const videosEncontrados = video.find({categoria: id}).populate('categoria');

            req.resultado = videosEncontrados;
            if (videosEncontrados !== null) {
                next();             
            } else {
                next(new NaoEncontrado("Id da Categoria não localizado."))
            }

        } catch (erro) {
            next(erro);
        }
    }


};

export default CategoriaController;
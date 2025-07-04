import { categoria, video } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";


class VideoController {

    static async listarVideos(req, res, next) {
        try {
            const buscaVideos = video.find().populate('categoria');

            req.resultado = buscaVideos;

            next()
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarVideoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const videoEncontrado = await video.findById(id).populate('categoria');
            if (videoEncontrado !== null) {
                res.status(200).json(videoEncontrado);
            } else {
                next(new NaoEncontrado("Id do Video não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async cadastrarVideo(req, res, next) {
        const novoVideo = req.body;
        let idCategoria = novoVideo.categoria;
        if (idCategoria === undefined) {
            idCategoria = "68653f39df27e9e1551edbc7";
        }
        try {
            const categoriaEncontrada = await categoria.findById(idCategoria);
            const videoCompleto = { ...novoVideo, categoria: { ...categoriaEncontrada._doc } };

            const videoCriado = await video.create(videoCompleto);

            res.status(200).json({ message: "Video carregado com sucesso.", video: videoCriado });
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarVideo(req, res, next) {
        try {
            const id = req.params.id;
            const videoEncontrado = await video.findByIdAndUpdate(id, {$set: req.body})
            if (videoEncontrado !== null) {
                res.status(200).json({ message: 'Video atualizado com sucesso!' });
            } else {
                next(new NaoEncontrado("Id do Video não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async excluirVideo(req, res, next) {
        try {
            const id = req.params.id;
            const videoEncontrado = await video.findByIdAndDelete(id)
            if (videoEncontrado !== null) {
                res.status(200).json({ message: 'Video excluído com sucesso!' });
            } else {
                next(new NaoEncontrado("Id do Video não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async listarVideosPorFiltro(req, res, next) {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const videosResultado = video.find(busca).populate('categoria');
                
                req.resultado = videosResultado;

                next();
            } else {
                res.status(200).send([]);
            }

        } catch (erro) {
            next(erro);
        }
    }

    static async listarVideosGratis(req, res, next){
        try{
            const listaGratis = await video
                .find()
                .sort({ _id:-1 })
                .limit(5)
                .exec()
            res.status(200).json(listaGratis);
        } catch (erro) {
            next(erro);
        }
    }

};

async function processaBusca(parametros) {
    const { titulo, descricao, nomeCategoria } = parametros;

    let busca = {};

    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if (descricao) busca.descricao = descricao;

    if (nomeCategoria) {
        const categoriaEncontrada = await categoria.findOne({ titulo: nomeCategoria });

        const categoriaId = categoriaEncontrada._id

        if (categoriaEncontrada !== null) {
            busca.categoria = categoriaId;
        } else {
            busca = null;
        }
    }
    return busca;
}

export default VideoController;
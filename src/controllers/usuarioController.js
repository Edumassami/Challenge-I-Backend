import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisiçãoIncorreta.js";
import { usuario } from "../models/index.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import gerarJwt from "../utils/gerarJwt.js";

class UsuarioController {

    static async cadastrarUsuario(req, res, next) {
        try {
            const novoUsuario = req.body;
            const usuarioExiste = await usuario.findOne({ email: novoUsuario.email });
            const { hashSenha, salSenha } = criaHashESalSenha(novoUsuario.senha);

            if (usuarioExiste === null) {
                const usuarioCriado = await usuario.create({
                    nome: novoUsuario.nome,
                    email: novoUsuario.email,
                    hashSenha: hashSenha,
                    salSenha: salSenha
                })
                res.status(200).json({ message: "Usuário cadastrado com sucesso", usuario: usuarioCriado });
            } else {
                next(new RequisicaoIncorreta('O usuário já existe'));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarCadastro(req, res, next) {
        try {
            const id = req.params.id;
            const usuarioEncontrado = await usuario.findByIdAndUpdate(id, { $set: req.body });
            if (usuarioEncontrado !== null) {
                res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
            } else {
                next(new NaoEncontrado("Id do Usuário não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async excluirCadastro(req, res, next) {
        try{
            const id = req.params.id;
            const usuarioEncontrado = await usuario.findByIdAndDelete(id);
            if (usuarioEncontrado !== null) {
                res.status(200).json({ message: 'Usuário excluído com sucesso!' });
            } else {
                next(new NaoEncontrado("Id do Usuário não localizado."))
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async autenticarUsuario(req, res, next) {
        try{
            const usuarioASerAutenticado = req.body;
            const usuarioExiste = await usuario.findOne({ email: usuarioASerAutenticado.email });

            if (usuarioExiste) {
                const autenticado = autenticarUsuario(usuarioASerAutenticado.senha, usuarioExiste);

                if(autenticado){
                    const tokenJwt = gerarJwt({ email: usuarioExiste.email })
                    res.status(200).json({ message: "Usuário autenticado com sucesso", token: tokenJwt });
                } else {
                    next(new RequisicaoIncorreta('Senha incorreta'));
                }
            } else {
                    next(new RequisicaoIncorreta('Usuário não encontrado'));
            }
        } catch (erro) {
            next(erro);
        }
    }
}

export default UsuarioController;

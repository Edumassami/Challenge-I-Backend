import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/RequisiçãoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoValidado from "../erros/NãoValidado.js";

function manipuladorDeErros(erro, req, res, next) {
    console.error(erro);

    if (erro instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
    } else if (erro instanceof NaoValidado) {
        erro.enviarResposta(res);
    } else if (erro instanceof ErroBase) {
        erro.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros
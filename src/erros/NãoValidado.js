import ErroBase from "./erroBase.js";

class NaoValidado extends ErroBase {
    constructor(mensagem = "Usuário não validado.") {
        super(mensagem, 401);
    }
}

export default NaoValidado;
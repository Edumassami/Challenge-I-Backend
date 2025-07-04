import jwt from "jsonwebtoken";
import NaoValidado from "../erros/NãoValidado.js";

function autorizarUsuario(req, res, next) {
    const token = req.headers.authorization;
    
    if(!token) {
        return next(new NaoValidado("Token não fornecido."));
    }
    const [bearer, jwtToken] = token.split(' ');    

    try {
        const payloadToken = jwt.verify(jwtToken, process.env.SEGREDO_JWT);
        req.usuario = payloadToken;
        next();
    } catch (erro) {
        next(new NaoValidado("Token inválido ou expirado."));
    }
}

export default autorizarUsuario;
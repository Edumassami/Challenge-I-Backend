import mongoose from "mongoose";
import validator from "validator";

const UsuarioSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatório'],
        unique: [true, "E-mail já cadastrado"],
        validate: {
            validator: function (url) {
                return validator.isEmail(url);
            },
            message: props => `${props.value} não é um e-mail válido.`
        }
    },
    hashSenha: {
        type: String,
        required: true
    },
    salSenha: {
        type: String,
        required: true
    }
}, { versionKey: false });

const usuario = mongoose.model("usuarios", UsuarioSchema);

export default usuario;
import mongoose from "mongoose";
import validator from "validator";

const videoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
        type: String,
        required: [true, "O título é obrigatório"],
        maxlength: 30,
    },
    descricao: {
        type: String,
        required: [true, "A descrição é obrigatória"],
    },
    url: {
        type: String,
        required: [true, "A URL é obrigatória"],
        validate: {
            validator: function (url) {
                return validator.isURL(url);
            },
            message: props => `${props.value} não é uma url válida.`
        }
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias'
    }
}, { versionKey: false });

const video = mongoose.model("videos", videoSchema);

export default video;
import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    titulo: {
        type: String,
        required: [ true, "O título é obrigatório" ],
    },
    cor: {
        type: String,
        required: [ true, "A cor é obrigatória" ],
        validate: {
            validator: function (v) {
                // Regex simples para HEX (#RRGGBB ou #RGB)
                return /^#([0-9A-F]{3}){1,2}$/i.test(v);
            },
            message: props => `${props.value} não é uma cor HEX válida!`
        }
    }
}, { versionKey: false });

const categoria = mongoose.model("categorias", categoriaSchema);

export { categoria, categoriaSchema };
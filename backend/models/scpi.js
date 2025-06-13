import mongoose from "mongoose";
const ScpiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rendement: Number,
  societeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Societe',
    required: true // elle ne peut pas etre cree sans une societe
  }
});

const Scpi = mongoose.model('Scpi', ScpiSchema);
export default Scpi;

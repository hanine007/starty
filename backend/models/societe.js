import mongoose from "mongoose";

const societeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Societe = mongoose.model("Societe", societeSchema);

export default Societe;

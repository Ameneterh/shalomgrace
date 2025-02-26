import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    tc_acceptance: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Saved = mongoose.model("Saved", savedSchema);

export default Saved;

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
      unique: true,
    },
    comments: {
      type: Array,
      default: [],
    },
    numberOfComments: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;

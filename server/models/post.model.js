import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    // image: {
    //   type: String,
    //   default:
    //     "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    // },
    slug: {
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

const Post = mongoose.model("Post", postSchema);

export default Post;

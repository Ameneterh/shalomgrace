import Post from "../models/post.model.js";

// ------------------------------  create new post ----------------------
export const createPost = async (req, res) => {
  const { title, content, poster } = req.body;

  try {
    // check content from req.body
    if (!title || !content) {
      throw new Error("All fields are required!");
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[()?!;.,]/g, "")
      .replace(/[^a-zA-Z0-9-]/g, "-");

    // check if post already exists
    const postAlreadyExists = await Post.findOne({ slug });
    if (postAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Post with title already exists" });
    }

    // save new user
    const post = new Post({
      title,
      content,
      poster,
      slug,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------- get all posts --------------------------------
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("poster");

    res.status(201).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------- get post by slug --------------------------------
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne(slug).populate("poster");

    res.status(201).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

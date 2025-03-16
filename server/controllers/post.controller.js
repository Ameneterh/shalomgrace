import Comment from "../models/comment.model.js";
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

// ------------------------------  update post ----------------------
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // check content from req.body
    if (!title || !content) {
      throw new Error("All fields are required!");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, slug },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ error: "Post not found" });

    res.status(201).json({
      success: true,
      message: "Post updated successfully",
      updatedPost,
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

//______________________________ FOR COMMENTS __________________________________

// ------------------------------  create new post ----------------------
export const addComment = async (req, res) => {
  const { content, postId, commentBy } = req.body;

  try {
    // check content from req.body
    if (!content) {
      throw new Error("Comments must have content!");
    }

    // if (userId !== req.user._id) {
    //   throw new Error("You are not allowed to create a comment!");
    // }

    // save new user
    const comment = new Comment({
      content,
      postId,
      commentBy,
    });

    await comment.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------- get all commts --------------------------------
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("commentBy");

    res.status(201).json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------- get comment by postId --------------------------------
export const getCommentByPostId = async (req, res) => {
  try {
    const comments = await Comment.find().populate("commentBy");

    res.status(201).json({
      success: true,
      message: "Post fetched successfully",
      comments,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

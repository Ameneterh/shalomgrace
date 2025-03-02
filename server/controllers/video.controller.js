import Video from "../models/video.model.js";

// ------------------------------  add new video ----------------------
export const addVideo = async (req, res) => {
  const { title, description, video_url, poster } = req.body;

  try {
    // check content from req.body
    if (!title || !description || !video_url || !poster) {
      throw new Error("All fields are required!");
    }

    // check if post already exists
    const videoAlreadyExists = await Video.findOne({ video_url });
    if (videoAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Video with the URL already exists" });
    }

    // save new user
    const video = new Video({
      title,
      description,
      video_url,
      poster,
    });

    await video.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      video,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ------------------- get all posts --------------------------------
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("poster");

    res.status(201).json({
      success: true,
      message: "Videos fetched successfully",
      videos,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

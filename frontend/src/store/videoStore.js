import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server"
    : "/server";

axios.defaults.withCredentials = true;

export const useVideoStore = create((set) => ({
  // post: null,
  error: null,
  isLoading: false,
  message: null,

  //   add new video
  addVideo: async (title, description, video_url, poster) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/video/add-video`, {
        title,
        description,
        video_url,
        poster,
      });
      set({
        // invoice: response.data.invoice,
        // isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error creating post",
        isLoading: false,
      });
      throw error;
    }
  },

  //   get all videos
  getAllVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/video/get-videos`);
      set({
        videos: response.data.videos,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Videos",
        isLoading: false,
      });
      throw error;
    }
  },
}));

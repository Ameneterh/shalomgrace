import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server"
    : "/server";

axios.defaults.withCredentials = true;

export const usePostStore = create((set) => ({
  // post: null,
  error: null,
  isLoading: false,
  message: null,

  //   add new invoice
  createPost: async (title, content, poster) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/post/create-post`, {
        title,
        content,
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

  //   get all clients
  getAllPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/post/get-posts`);
      set({
        posts: response.data.posts,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Posts",
        isLoading: false,
      });
      throw error;
    }
  },

  //   get one clients
  getPostBySlug: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/post/get-post/${slug}`);
      set({
        post: response.data.post,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting post",
        isLoading: false,
      });
      throw error;
    }
  },
}));

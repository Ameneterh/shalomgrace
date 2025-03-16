import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server"
    : "/server";

axios.defaults.withCredentials = true;

export const usePostStore = create((set) => ({
  post: [],
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

  //   get all clients
  editPost: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/post/edit-post/${postId}`, {
        ...updatedData,
      });
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...updatedData } : post
        ),
      }));
    } catch (error) {
      set({
        error: error.response.data.message || "Error Editing Post",
        isLoading: false,
      });
      throw error;
    }
  },

  //_______________________________ FOR COMMENTS _______________________________

  //   add new comment
  addComment: async (content, postId, commentBy) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/comment/add-comment`, {
        content,
        postId,
        commentBy,
      });
      set({
        comment: response.data.comment,
        // isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error adding comment",
        isLoading: false,
      });
      throw error;
    }
  },

  // get all comments
  getAllComments: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/comment/get-comments`);
      set({
        comments: response.data.comments,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error Getting Comments",
        isLoading: false,
      });
      throw error;
    }
  },

  // get all comments
  likeComment: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/comment/like-comment`);
      set({
        comments: response.data.comments,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error Liking Comment",
        isLoading: false,
      });
      throw error;
    }
  },
}));

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePostStore } from "../store/postStore";
import PostsComponent from "../components/PostsComponent";

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const { getAllPosts } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts.posts);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="py-2 md:py-6 flex">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-6xl w-full mx-auto mt-2 p-4 rounded-xl"
      >
        <h1 className="text-xl md:text-3xl font-semibold text-center text-white mb-6">
          All Added Content
        </h1>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <PostsComponent />
        </div>
      </motion.div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePostStore } from "../store/postStore";
import PostsComponent from "../components/PostsComponent";

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const { getAllPosts, isLoading } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      isLoading;
      try {
        const posts = await getAllPosts();
        setPosts(posts.posts);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

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
          Enlightening, Educating, Entertaining!
        </h1>
        <p className="text-sm py-5 max-w-4xl mx-auto text-center text-white">
          elit. Eaque dolores excepturi porro sapiente non inventore fugiat
          facere magni soluta laborum nemo, iure voluptatibus voluptate in,
          nostrum neque libero explicabo veritatis? Lorem ipsum dolor sit amet,
          consectetur adipisicing
        </p>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <PostsComponent />
          </div>
          <div className="max-w-96">Advert Placement</div>
        </div>
      </motion.div>
    </div>
  );
}

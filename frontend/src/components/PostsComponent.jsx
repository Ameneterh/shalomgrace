import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import { usePostStore } from "../store/postStore";
import Divider from "./Divider";
import { BiLike, BiCommentDetail } from "react-icons/bi";

export default function PostsComponent() {
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

  return (
    <>
      {posts?.map((post, index) => (
        <Link to={`/posts/${post.slug}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto mt-2 rounded bg-white shadow-md overflow-hidden"
          >
            <div className="px-3 py-2">
              <h1 className="text-sm md:text-lg font-semibold line-clamp-1 md:line-clamp-none">
                {post.title}
              </h1>
              <Divider />
              <div
                dangerouslySetInnerHTML={{ __html: post && post.content }}
                className="w-full text-sm text-justify mt-2 line-clamp-3 text-gray-800"
              ></div>
            </div>
            {/* <Divider /> */}
            <div className="flex justify-between items-center gap-2 text-sm bg-white px-3 py-1">
              <p className="flex items-center gap-1 text-xs text-red-700 font-semibold">
                Posted on:{" "}
                {moment(post.createdAt).format("MM/DD/YYYY HH:mm:ss")}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <p className="flex items-center gap-1">
                  {post.numberOfComments}
                  <BiLike />
                </p>
                <p className="flex items-center gap-1">
                  {post.numberOfComments}
                  <BiCommentDetail />
                </p>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </>
  );
}

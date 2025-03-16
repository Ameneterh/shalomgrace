import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { motion } from "framer-motion";
import moment from "moment";
import { usePostStore } from "../store/postStore";
import { useParams } from "react-router-dom";
import Divider from "./Divider";
import CommentSection from "./CommentSection";

export default function PostPage() {
  const { getAllPosts, getAllComments } = usePostStore();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [postComments, setPostComments] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await getAllPosts();
        setPosts(post.posts);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    try {
      const selectedPost = posts.filter((post) => post.slug === slug);

      setSelectedPost(selectedPost[0]);
    } catch (error) {
      console.log(error.message);
    }
  }, [posts]);

  // -------------------------------------------
  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await getAllComments();

        const selectedComments = comments.comments.filter(
          (comment) => comment.postId === selectedPost._id
        );
        setPostComments(selectedComments);
      } catch (error) {
        console.log(error);
      }
    };

    getComments();
  }, [selectedPost]);

  console.log(postComments);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen max-w-4xl w-full mx-auto my-6 p-4 rounded-xl text-gray-200"
    >
      <h1 className="text-xl md:text-3xl font-semibold text-center mb-6">
        {selectedPost?.title}
      </h1>

      {/* post exerpt */}
      <div className="text-gray-300">
        <div
          dangerouslySetInnerHTML={{
            __html: selectedPost && selectedPost.content,
          }}
          className="w-full text-lg text-center mt-3 mb-6 line-clamp-2 leading-6"
        ></div>
      </div>

      {/* post publisher, date, read time, likes, comments */}
      <div className="text-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>By {selectedPost?.poster?.fullname}</p>
          <BsDash />
          <p>{moment(selectedPost?.createdAt).format("LL")}</p>
          <p className="font-semibold">
            Reading Time: {(selectedPost?.content?.length / 1000).toFixed(0)}{" "}
            {(selectedPost?.content?.length / 1000).toFixed(0) > 1
              ? "mins"
              : "min"}{" "}
            read
          </p>
        </div>
        <div className="flex items-center gap-2 text-md">
          {/* <p className="flex items-center gap-1">
            {selectedPost?.numberOfComments}
            <BiLike />
          </p> */}
          <p className="flex items-center gap-1">
            {postComments?.length > 0 ? postComments?.length : 0}
            <BiCommentDetail />
          </p>
        </div>
      </div>
      <Divider />

      {/* post content */}
      <div className="w-full flex flex-col sm:flex-row">
        <div
          dangerouslySetInnerHTML={{
            __html: selectedPost && selectedPost.content,
          }}
          className="w-full text-md text-justify mt-2"
        ></div>
      </div>
      <div className="max-w-5xl my-6">
        <CommentSection postId={selectedPost?._id} />
      </div>
    </motion.div>
  );
}

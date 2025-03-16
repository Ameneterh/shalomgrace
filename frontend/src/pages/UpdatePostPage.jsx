import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  TextInput,
  Select,
  FileInput,
  Button,
  Alert,
  Spinner,
} from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { modules } from "../modules.js";
import { useAuthStore } from "../store/authStore.js";
import { usePostStore } from "../store/postStore.js";

export default function UpdatePostPage() {
  const { user } = useAuthStore();
  const { getAllPosts, editPost } = usePostStore();

  const [file, setFile] = useState(null);

  const { postId } = useParams();
  const [formData, setFormData] = useState({});
  const [selectedPost, setSelectedPost] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(formData);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const response = await getAllPosts();
        const posts = await response.posts;

        setFormData(posts);
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  useEffect(() => {
    try {
      const selectedPost = formData.filter((post) => post._id === postId);

      setSelectedPost(selectedPost[0]);
    } catch (error) {
      console.log(error.message);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editPost(postId);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen mb-6 px-2">
      <h1 className="text-center text-3xl my-7 font-semibold text-white">
        Update Post
      </h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-5xl w-full mx-auto my-6 p-4 rounded-md  bg-white text-gray-200"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Post Title"
              required
              id="title"
              className="flex-1 font-bold"
              value={selectedPost.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {/* <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="worship">Worship</option>
            <option value="holiness">Holiness</option>
            <option value="thanksgiving">Thanksgiving</option>
          </Select> */}
          </div>

          <ReactQuill
            theme="snow"
            modules={modules}
            placeholder="Write something ..."
            className="h-[450px] mb-12 text-black"
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            value={selectedPost.content}
          />

          <Button
            type="submit"
            className="bg-[#D75825] hover:bg-[#D75825] hover:opacity-65 my-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Updating Post ...</span>
              </>
            ) : (
              "Update Post"
            )}
          </Button>

          {/* <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Updating Post ...</span>
              </>
            ) : (
              "Update Post"
            )}
          </Button> */}

          {publishError && (
            <Alert color="failure" className="mt-5">
              {publishError}
            </Alert>
          )}
        </form>
      </motion.div>
    </div>
  );
}

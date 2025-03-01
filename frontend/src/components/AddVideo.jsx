import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TextInput,
  Select,
  FileInput,
  Button,
  Alert,
  Spinner,
  Textarea,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

export default function AddPost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/content/addvideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate("/health-talks");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl mb-7 font-semibold">Add a Video</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Video Title"
            required
            id="videotitle"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, videotitle: e.target.value })
            }
          />
          <TextInput
            type="text"
            placeholder="Video URL"
            id="videoId"
            className="flex-1"
            onChange={(e) =>
              setFormData({
                ...formData,
                videoId: e.target.value.split("=")[1],
              })
            }
          />
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write something ..."
          className="h-20 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, videodescription: value });
          }}
        />

        <motion.button
          className="mt-5 py-2 px-4 bg-[#d75825] text-white hover:font-bold hover:bg-opacity-90 rounded-md focus:outline-none transition duration-200 cursor-pointer flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Publishing ...</span>
            </>
          ) : (
            "Publish Video"
          )}
        </motion.button>

        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

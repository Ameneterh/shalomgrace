import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore.js";
import { useAuthStore } from "../store/authStore.js";

export default function AddPost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { createPost } = usePostStore();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  // const handleUploadImage = async () => {
  //   try {
  //     if (!file) {
  //       setImageUploadError("Please, select an image");
  //       return;
  //     }
  //     setImageUploadError(null);
  //     const storage = getStorage(app);
  //     const fileName = new Date().getTime() + "-" + file.name;
  //     const storageRef = ref(storage, fileName);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         setImageUploadProgress(progress.toFixed(0));
  //       },
  //       (error) => {
  //         setImageUploadError("Image upload failed!");
  //         setImageUploadProgress(null);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setImageUploadProgress(null);
  //           setImageUploadError(null);
  //           setFormData({ ...formData, postimage: downloadURL });
  //         });
  //       }
  //     );
  //   } catch (error) {
  //     setImageUploadError("Image upload failed!!");
  //     setImageUploadProgress(null);
  //     // console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const poster = user._id;
    try {
      await createPost(formData.title, formData.content, poster);
      navigate("/dashboard?tab=posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl mb-7 font-semibold">Add a Post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* <div className="flex gap-4 items-center justify-between border-2 border-purple-500 p-3 rounded-lg">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {formData.postimage && (
          <img
            src={formData.postimage}
            alt="upload"
            className="w-full, h-72 object-cover"
          />
        )} */}

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Post Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write something ..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
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
            "Publish Post"
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

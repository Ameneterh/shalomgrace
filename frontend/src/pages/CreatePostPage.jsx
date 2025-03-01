import React from "react";
import { motion } from "framer-motion";
import { MdAddBusiness } from "react-icons/md";
import { Tabs } from "flowbite-react";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import AddPost from "../components/AddPost";
import AddVideo from "../components/AddVideo";

export default function CreatePostPage() {
  return (
    <div className="py-2 md:py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-6xl w-full mx-auto mt-2 p-4 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl bg-white"
      >
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          Add Blog Content
        </h1>
        <Tabs>
          <Tabs.Item active title="Add Post" icon={MdOutlinePostAdd}>
            <AddPost />
          </Tabs.Item>
          <Tabs.Item active title="Add Video" icon={RiVideoAddLine}>
            <AddVideo />
          </Tabs.Item>
        </Tabs>
      </motion.div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import VideosComponent from "../components/VideosComponent";

export default function GalleryPage() {
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
          Galleria - Pictures & Videos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <VideosComponent />
        </div>
      </motion.div>
    </div>
  );
}

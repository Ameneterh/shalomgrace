import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import { usePostStore } from "../store/postStore";
import Divider from "./Divider";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { useVideoStore } from "../store/videoStore";

export default function VideosComponent() {
  const [videos, setVideos] = useState([]);
  const { getAllVideos } = useVideoStore();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getAllVideos();
        setVideos(videos.videos);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchVideos();
  }, []);

  console.log(videos);
  // const videoURL = `https://www.youtube.com/embed/${video.videoId}`;

  return (
    <>
      {videos?.map((video, index) => (
        // <Link
        //   to={`https://www.youtube.com/embed/${video.video_url}`}
        //   key={index}
        // >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="w-full sm:w-80 mx-auto mt-2 rounded shadow-md overflow-hidden bg-white"
        >
          <div className="w-full p-2">
            <iframe
              src={`https://www.youtube.com/embed/${video.video_url}`}
              width="300"
              height="280"
              className="rounded-lg"
            ></iframe>

            <div className="w-full flex gap-2 mt-2 bg-white p-2">
              <div className="flex w-10 h-10 rounded-full bg-black"></div>
              <div className="flex-1">
                <p className="text-sm line-clamp-1 font-bold">{video.title}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: video && video.description,
                  }}
                  className="w-full text-xs line-clamp-3"
                ></div>
                {/* <span className="italic text-sm">{video.description}</span> */}
              </div>
            </div>
          </div>
        </motion.div>
        // </Link>
      ))}
    </>
  );
}

import { Alert, Button, Modal, TextInput, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { usePostStore } from "../store/postStore";

export default function CommentSection({ postId }) {
  const { user } = useAuthStore();
  const { addComment, getAllComments } = usePostStore();

  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const commentBy = user._id;

      const newComment = await addComment(comment, postId, commentBy);
      // navigate("/dashboard?tab=posts");

      // const res = await fetch("/server/comment/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     content: comment,
      //     postId,
      //     userId: user._id,
      //   }),
      // });
      // const data = await res.json();
      // if (res.ok) {
      setComment("");
      setCommentError(null);
      setComments([newComment, ...comments]);
      // }
    } catch (error) {
      console.log(error);
      // setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await getAllComments();
        setComments(comments.comments);
      } catch (error) {
        console.log(error);
      }
    };

    getComments();
  }, [postId]);

  useEffect(() => {
    try {
      const setComments = comments.filter(
        (comment) => comment.postId === postId
      );

      setPostComments(setComments);
    } catch (error) {
      console.log(error.message);
    }
  }, [comments]);

  const handleLike = async (commentId) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      const res = await likePost(`/server/comment/likecomment/${commentId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    // setShowModal(false);
    // try {
    //   if (!user) {
    //     navigate("/sign-in");
    //     return;
    //   }
    //   const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
    //     method: "DELETE",
    //   });
    //   if (res.ok) {
    //     const data = await res.json();
    //     setComments(comments.filter((comment) => comment._id !== commentId));
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  return (
    <div className="w-full mx-auto p-3 bg-gray-50 bg-opacity-10 rounded">
      {user ? (
        <div className="flex items-center gap-1 my-5text-gray-500 text-sm text-white">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={user.profilePicture}
            alt="user image"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-sm  text-gray-300 hover:underline"
          >
            {user.fullname}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-gray-300 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      {user && (
        <form
          onSubmit={handleSubmit}
          className="border border-gray-200 rounded-md p-3 mt-3"
        >
          <Textarea
            placeholder="Add a comment ..."
            rows={3}
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-200 text-sm">
              {200 - comment.length}{" "}
              {200 - comment.length === 1 ? "character" : "characters"}{" "}
              remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit Comment
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {postComments.length === 0 ? (
        <p className="text-sm my-5 text-black">No comments yet</p>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-sm my-5 flex items-center">
            <div className="text-white border border-white px-3 rounded mx-2 shadow-sm">
              {postComments.length}
            </div>
            <p className="text-white">
              {postComments.length > 0 ? "Comments" : "Comment"}
            </p>
          </div>
          {postComments.map((comment) => (
            <Comment
              key={comment?._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              OnDelete={(commentId) => {
                setShowModal(true), setCommentToDelete(commentId);
              }}
            />
          ))}
        </div>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I am Sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

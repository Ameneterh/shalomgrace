import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";
import { useAuthStore } from "../store/authStore";
import { usePostStore } from "../store/postStore";

export default function Comment({ comment, onLike, onEdit, OnDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { user } = useAuthStore();
  const { editComment } = usePostStore();
  const commentBy = comment.commentBy;

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const res = await fetch(`/api/user/${comment.userId}`);
  //       const data = await res.json();
  //       if (res.ok) {
  //         setUser(data);
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getUser();
  // }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await editComment({
        id: comment._id,
        content: editedContent,
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 shadow rounded-md m-2 text-sm bg-gray-400 bg-opacity-20 border border-gray-400">
      <div className="flex-shrink-0 mr-3">
        <img
          className="h-10 w-10 rounded-full bg-gray-200"
          src={commentBy?.profilePicture}
          alt={commentBy?.fullname}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-2 text-xs truncate">
            {commentBy ? `@${commentBy.fullname}` : "anonymous user"}
          </span>
          <span className="text-gray-200 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={() => handleSave(comment._id)}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-50 mb-2 text-sm">{comment.content}</p>
            <div className="flex items-center pt-2 text-sm max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-200 hover:text-blue-500 ${
                  user && comment?.likes?.includes(user._id) && "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-200">
                {comment?.numberOfLikes > 0 &&
                  comment?.numberOfLikes +
                    " " +
                    (comment?.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {user &&
                (user?._id === comment?.commentBy?._id || user.isAdmin) && (
                  <>
                    {/* <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-200 hover:text-blue-500"
                  >
                    Edit
                  </button> */}
                    <button
                      type="button"
                      onClick={() => OnDelete(comment._id)}
                      className="text-gray-200 hover:text-red-950"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

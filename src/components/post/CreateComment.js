import React, { useState, useRef, useEffect } from "react";
import Picker from "emoji-picker-react";
import { comment } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #1876f2;
`;

export default function CreateComment({ user, postId }) {
  const textRef = useRef(null);
  const imgInput = useRef(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentImage, setCommentImage] = useState("");
  const [error, setError] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [picker, setPicker] = useState(false);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();

    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(
        `${file.name} is unsupported | only (jpeg, png, webp, gif) are allowed.`
      );
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} size is too large | only up to 5mb allowed.`);
      setCommentImage("");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      if (commentImage != "") {
        setLoading(true);
        const img = dataURItoBlob(commentImage);

        const path = `${user.username}/post_images/${postId}`;
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);

        const imgComment = await uploadImages(formData, path, user.token);
        const comments = await comment(
          postId,
          text,
          imgComment[0].url,
          user.token
        );
        setLoading(false);
        setText("");
        setCommentImage("");
      } else {
        setLoading(true);
        const comments = await comment(postId, text, "", user.token);
        setLoading(false);
        setText("");
        setCommentImage("");
      }
    }
  };

  return (
    <>
      {user && (
        <div className="create_comment_wrap">
          <div className="create_comment">
            <img
              src={user.picture}
              alt={`${user.first_name} ${user.last_name}`}
            />
            <div className="comment_input_wrap">
              {picker && (
                <div className="comment_emoji_picker ">
                  <Picker onEmojiClick={handleEmoji} />
                </div>
              )}
              <input
                type="file"
                hidden
                ref={imgInput}
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImage}
              />
              {error && (
                <div className="postError comment_error">
                  <div className="postError_error">{error}</div>
                  <button className="blue_btn" onClick={() => setError("")}>
                    Try again
                  </button>
                </div>
              )}
              <input
                type="text"
                placeholder="Write a comment..."
                ref={textRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={handleComment}
              />
              <div className="comment_circle">
                <ClipLoader
                  color="#1876f2"
                  loading={loading}
                  css={override}
                  size={20}
                />
              </div>
              <div
                className="comment_circle_icon hover2"
                onClick={() => setPicker((prev) => !prev)}
              >
                <i className="emoji_icon"></i>
              </div>
              <div
                className="comment_circle_icon hover2"
                onClick={() => imgInput.current.click()}
              >
                <i className="camera_icon"></i>
              </div>
              <div className="comment_circle_icon hover2">
                <i className="gif_icon"></i>
              </div>
              <div className="comment_circle_icon hover2">
                <i className="sticker_icon"></i>
              </div>
            </div>
          </div>
          {commentImage && (
            <div className="comment_img_preview">
              <img src={commentImage} alt="" />
              <div
                className="small_white_circle"
                onClick={() => setCommentImage("")}
              >
                <i className="exit_icon"></i>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

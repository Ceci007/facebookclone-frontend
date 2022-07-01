import React, { useState, useRef } from "react";
import { createPost } from "../../functions/post";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
import PulseLoader from "react-spinners/PulseLoader";
import useClickOutside from "../../helpers/clickOutside";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import PostError from "./postError";
import { css } from "@emotion/react";
import "./style.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function CreatePostPopup({ user, setVisible }) {
  const popup = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");

  useClickOutside(popup, () => {
    setVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response === "Ok") {
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img, i) => {
        return dataURItoBlob(img);
      });

      const path = `${user.username}/postImages`;
      let formData = new FormData();
      formData.append("path", path);

      postImages.forEach((image) => {
        formData.append("file", image);
      });

      const response = await uploadImages(formData, path, user.token);
      await createPost(null, null, text, response, user.id, user.token);
      setLoading(false);
      setBackground("");
      setText("");
      setImages([]);
      setVisible(false);
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response === "Ok") {
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };

  return (
    <>
      {user && (
        <div className="blur">
          <div className="postBox" ref={popup}>
            {error && <PostError error={error} setError={setError} />}
            <div className="box_header">
              <div className="small_circle" onClick={() => setVisible(false)}>
                <i className="exit_icon"></i>
              </div>
              <span>Create Post</span>
            </div>
            <div className="box_profile">
              <img src={user.picture} alt="" className="box_profile_img" />
              <div className="box_col">
                <div className="box_profile_name">
                  {user.first_name} {user.last_name}
                </div>
                <div className="box_privacy">
                  <img src="../../../icons/public.png" alt="" />
                  <span>Public</span>
                  <i className="arrowDown_icon"></i>
                </div>
              </div>
            </div>

            {!showPrev ? (
              <>
                <EmojiPickerBackgrounds
                  user={user}
                  text={text}
                  setText={setText}
                  background={background}
                  setBackground={setBackground}
                />
              </>
            ) : (
              <ImagePreview
                user={user}
                text={text}
                setText={setText}
                images={images}
                setImages={setImages}
                setShowPrev={setShowPrev}
              />
            )}
            <AddToYourPost setShowPrev={setShowPrev} />
            <button
              className="post_submit"
              onClick={() => postSubmit()}
              disabled={loading}
            >
              {loading ? (
                <PulseLoader color="#fff" css={override} size={5} />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

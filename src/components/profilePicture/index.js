import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutside from "../../helpers/clickOutside";
import "./style.css";

export default function ProfilePicture({ setShow, pRef, photos }) {
  const { user } = useSelector((state) => ({ ...state }));
  const popupRef = useRef(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useClickOutside(popupRef, () => {
    //popupRef.current.style.display = "none";
    setShow(false);
  });

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
      setImage("");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <>
      <div className="blur" />
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      <div className="postBox pictureBox" ref={popupRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => inputRef.current.click()}
            >
              <i className="plus_icon filter_blue"></i> Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i> Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>Your profile pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>Other pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
        {image && (
          <UpdateProfilePicture
            setImage={setImage}
            image={image}
            error={error}
            setError={setError}
            setShow={setShow}
            pRef={pRef}
          />
        )}
      </div>
    </>
  );
}

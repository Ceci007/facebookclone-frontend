import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";

export default function OldCover({ photos, setCoverPicture, setShow }) {
  const { user } = useSelector((state) => ({ ...state }));
  const oldCoverMenuRef = useRef(null);

  useClickOutside(oldCoverMenuRef, () => setShow(false));

  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={oldCoverMenuRef}>
        <div className="post_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Your profile pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) => img.folder === `${user.username}/cover_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
          <h4>Other pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter((img) => img.folder !== `${user.username}/post_images`)
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

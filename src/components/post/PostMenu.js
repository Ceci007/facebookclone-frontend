import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/clickOutside";
import { savePost, deletePost } from "../../functions/post";

export default function PostMenu({
  userId,
  postUserId,
  imagesLength,
  postId,
  token,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  const [test, setTest] = useState(userId === postUserId);
  const postMenuRef = useRef(null);

  useClickOutside(postMenuRef, () => {
    postMenuRef.current.style.display = "none";
  });

  const saveHandler = async () => {
    savePost(postId, token);
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };

  const downloadImages = async () => {
    images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };

  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.status === "Ok") {
      postRef.current.remove();
    }
  };

  return (
    <ul className="post_menu" ref={postMenuRef}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items"
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items"
          />
        )}
      </div>
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit Audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <div onClick={() => deleteHandler()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="Items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Repost Post"
          subtitle="I'm concerned about this post"
        />
      )}
    </ul>
  );
}

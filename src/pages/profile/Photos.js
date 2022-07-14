import React, { useReducer, useEffect } from "react";
import { photosReducer } from "../../functions/reducers";
import axios from "axios";

export default function Photos({ username, token }) {
  const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
    loading: false,
    error: "",
    photos: {},
  });

  useEffect(() => {
    getPhotos();
  }, [username]);

  const path = `${username}/*`;
  const max = 30;
  const sort = "desc";

  const getPhotos = async () => {
    try {
      dispatch({
        type: "PHOTOS_REQUEST",
      });

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        { path, sort, max },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "PHOTOS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHOTOS_ERROR",
        payload:
          error && error.response && error.response.data
            ? error.response.data.message
            : "",
      });
    }
  };

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.length &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} />
            </div>
          ))}
      </div>
    </div>
  );
}

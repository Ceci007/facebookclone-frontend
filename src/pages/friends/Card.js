import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cancelRequest,
  acceptRequest,
  deleteRequest,
} from "../../functions/user";

export default function Card({ friend, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));

  const cancelRequestHandler = async (userId) => {
    const res = await cancelRequest(userId, user.token);
    if (res === "Ok") {
      getData();
    }
  };

  const confirmHandler = async (userId) => {
    const res = await acceptRequest(userId, user.token);
    if (res === "Ok") {
      getData();
    }
  };

  const deleteHandler = async (userId) => {
    const res = await deleteRequest(userId, user.token);
    if (res === "Ok") {
      getData();
    }
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${friend.username}`}>
        <img src={friend.picture} />
      </Link>
      <div className="req_name">
        {friend.first_name} {friend.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="blue_btn"
          onClick={() => cancelRequestHandler(friend._id)}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="blue_btn"
            onClick={() => confirmHandler(friend._id)}
          >
            Confirm
          </button>
          <button
            className="gray_btn"
            onClick={() => deleteHandler(friend._id)}
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addFriend,
  cancelRequest,
  follow,
  unfollow,
} from "../../functions/user";
import useClickOutside from "../../helpers/clickOutside";

export default function Friendship({ friendshipProp, profileId }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [friendship, setFriendship] = useState(friendshipProp);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menuFriendsRef = useRef(null);
  const menuRespondRef = useRef(null);

  useClickOutside(menuFriendsRef, () => setFriendsMenu(false));
  useClickOutside(menuRespondRef, () => setRespondMenu(false));
  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(profileId, user.token);
  };

  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelRequest(profileId, user.token);
  };

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileId, user.token);
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(profileId, user.token);
  };

  useEffect(() => {
    setFriendship(friendshipProp);
  }, [friendshipProp]);

  return (
    <>
      {friendship && (
        <div className="friendship">
          {friendship.friends ? (
            <div className="friends_menu_wrap">
              <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
                <img src="../../../icons/friends.png" />
                <span>Friends</span>
              </button>
              {friendsMenu && (
                <div className="open_cover_menu" ref={menuFriendsRef}>
                  <div className="open_cover_menu_item hover1">
                    <img src="../../../icons/favoritesOutline.png" />
                    Favorites
                  </div>
                  <div className="open_cover_menu_item hover1">
                    <img src="../../../icons/editFriends.png" />
                    Edit Friend List
                  </div>
                  {friendship.following ? (
                    <div
                      className="open_cover_menu_item hover1"
                      onClick={() => unfollowHandler()}
                    >
                      <img src="../../../icons/unfollowOutlined.png" />
                      Unfollow
                    </div>
                  ) : (
                    <div
                      className="open_cover_menu_item hover1"
                      onClick={() => followHandler()}
                    >
                      <img src="../../../icons/unfollowOutlined.png" />
                      Follow
                    </div>
                  )}
                  <div className="open_cover_menu_item hover1">
                    <i className="unfriend_outlined_icon"></i>
                    Unfriend
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!friendship.requestSent && !friendship.requestReceived && (
                <button className="blue_btn" onClick={() => addFriendHandler()}>
                  <img src="../../../icons/addFriend.png" className="invert" />
                  <span>Add Friend</span>
                </button>
              )}
            </>
          )}
          {friendship.requestSent ? (
            <button className="blue_btn" onClick={() => cancelRequestHandler()}>
              <img src="../../../icons/cancelRequest.png" className="invert" />
              <span>Cancel Request</span>
            </button>
          ) : (
            friendship.requestReceived && (
              <div className="friends_menu_wrap">
                <button
                  className="gray_btn"
                  onClick={() => setRespondMenu(true)}
                >
                  <img src="../../../icons/friends.png" />
                  <span>Respond</span>
                </button>
                {respondMenu && (
                  <div className="open_cover_menu" ref={menuRespondRef}>
                    <div className="open_cover_menu_item hover1">Confirm</div>
                    <div className="open_cover_menu_item hover1">Delete</div>
                  </div>
                )}
              </div>
            )
          )}
          {friendship.following ? (
            <button className="gray_btn" onClick={() => unfollowHandler()}>
              <img src="../../../icons/follow.png" />
              <span>Following</span>
            </button>
          ) : (
            <button className="blue_btn" onClick={() => followHandler()}>
              <img src="../../../icons/follow.png" className="invert" />
              <span>Follow</span>
            </button>
          )}
          <button className={friendship.friends ? "blue_btn" : "gray_btn"}>
            <img
              src="../../../icons/message.png"
              className={friendship.friends && "invert"}
            />
            <span>Message</span>
          </button>
        </div>
      )}
    </>
  );
}

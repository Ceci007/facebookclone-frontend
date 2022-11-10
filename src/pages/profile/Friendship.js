import React, { useState, useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";

export default function Friendship({ friendship }) {
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menuFriendsRef = useRef(null);
  const menuRespondRef = useRef(null);

  useClickOutside(menuFriendsRef, () => setFriendsMenu(false));
  useClickOutside(menuRespondRef, () => setRespondMenu(false));

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
                    <div className="open_cover_menu_item hover1">
                      <img src="../../../icons/unfollowOutlined.png" />
                      Unfollow
                    </div>
                  ) : (
                    <div className="open_cover_menu_item hover1">
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
                <button className="blue_btn">
                  <img src="../../../icons/addFriend.png" className="invert" />
                  <span>Add Friend</span>
                </button>
              )}
            </>
          )}
          {friendship.requestSent ? (
            <button className="blue_btn">
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
            <button className="gray_btn">
              <img src="../../../icons/follow.png" />
              <span>Following</span>
            </button>
          ) : (
            <button className="blue_btn">
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

import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPost from "./GridPost";
import Post from "../../components/post";
import "./style.css";

export default function Profile({ setVisible }) {
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const userName = username === undefined ? user.username : username;

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    error: "",
    profile: {},
  });

  useEffect(() => {
    getProfile();
  }, [userName]);

  const visitor = !(userName === user.username);
  console.log(visitor);

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.ok === false) {
        navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload:
          error && error.response && error.response.data
            ? error.response.data.message
            : "",
      });
    }
  };

  console.log(profile);

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} />
          <ProfilePictureInfos profile={profile} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left"></div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPost />
                <div className="posts">
                  {profile && profile.posts && profile.posts.length > 0 ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

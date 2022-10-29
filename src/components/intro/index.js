import React, { useEffect, useState } from "react";
import Bio from "./Bio";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Intro({ detailsProp, visitor }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setDetails] = useState();

  useEffect(() => {
    setDetails(detailsProp);
  }, [detailsProp]);

  const initial = {
    bio: details && details.bio ? details.bio : "",
    othername: details && details.othername ? details.othername : "",
    job: details && details.job ? details.job : "",
    workplace: details && details.workplace ? details.workplace : "",
    highSchool: details && details.highSchool ? details.highSchool : "",
    college: details && details.college ? details.college : "",
    currentCity: details && details.currentCity ? details.currentCity : "",
    hometown: details && details.hometown ? details.hometown : "",
    relationship: details && details.relationship ? details.relationship : "",
    instagram: details && details.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(true);
  const [max, setMax] = useState(
    infos && infos.bio ? 100 - infos.bio.length : 100
  );
  const handleBioChange = (e) => {
    setInfos({ ...infos, bio: e.target.value });
    setMax(100 - e.target.value.length);
  };
  const updateDetails = async () => {
    try {
      console.log("sent");
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  console.log(details);
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {details && details.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details && details.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleBioChange={handleBioChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
        />
      )}
      {details && details.job && details && details.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details && details.job} at{" "}
          <b>{details && details.workplace}</b>
        </div>
      ) : details && details.job && details && !details.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details && details.job}
        </div>
      ) : (
        details &&
        details.workplace &&
        details &&
        !details.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            works at {details && details.workplace}
          </div>
        )
      )}
      {details && details.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {details && details.relationship}
        </div>
      )}
      {details && details.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details && details.college}
        </div>
      )}
      {details && details.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details && details.highSchool}
        </div>
      )}
      {details && details.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in {details && details.currentCity}
        </div>
      )}
      {details && details.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          From {details && details.hometown}
        </div>
      )}
      {details && details.hometown && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details && details.instagram}`}
            target="_blank"
          >
            {details && details.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Edit Details</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )}
    </div>
  );
}

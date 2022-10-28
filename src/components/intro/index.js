import React, { useState } from "react";
import "./style.css";

export default function Intro({ details }) {
  const initial = {
    bio: details && details.bio ? details.bio : "",
    otherName: details && details.otherName ? details.otherName : "",
    job: details && details.job ? details.job : "",
    workplace: details && details.workplace ? details.workplace : "Google",
    highSchool:
      details && details.highSchool ? details.highSchool : "some highschool",
    college: details && details.college ? details.college : "some college",
    currentCity:
      details && details.currentCity ? details.currentCity : "Tanger",
    hometown: details && details.hometown ? details.hometown : "Morocco",
    relationship: details && details.relationship ? details.relationship : "XD",
    instagram: details && details.instagram ? details.instagram : "asdasd",
  };
  const [infos, setInfos] = useState(initial);

  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos.job && infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" />
          Works as {infos.job} at <b>{infos.workplace}</b>
        </div>
      ) : infos.job && !infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" />
          Works as {infos.job}
        </div>
      ) : (
        infos.workplace &&
        !infos.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" />
            Works at <b>{infos.workplace}</b>
          </div>
        )
      )}
      {infos.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" />
          Studied at {infos.college}
        </div>
      )}
      {infos.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" />
          Studied at {infos.highSchool}
        </div>
      )}
      {infos.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" />
          Lives in {infos.currentCity}
        </div>
      )}
      {infos.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" />
          from {infos.hometown}
        </div>
      )}
      {infos.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" />
          {infos.relationship}
        </div>
      )}
      {infos.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" />
          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target="_blank"
          >
            {infos.instagram}
          </a>
        </div>
      )}
    </div>
  );
}

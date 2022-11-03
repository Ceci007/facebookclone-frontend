import React, { useRef } from "react";
import Detail from "./Detail";
import useClickOutside from "../../helpers/clickOutside";

export default function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) {
  const detailsModalRef = useRef(null);

  useClickOutside(detailsModalRef, () => {
    setVisible(false);
  });

  return (
    <div className="blur">
      <div className="postBox infosBox" ref={detailsModalRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize your intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className="details_header">Other Name</div>
          <Detail
            value={details && details.otherName ? details.otherName : ""}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="other name"
          />
          <div className="details_header">Work</div>
          <Detail
            value={details && details.job ? details.job : ""}
            img="job"
            placeholder="Add job tittle"
            name="job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="job"
          />
          <Detail
            value={details && details.workplace ? details.workplace : ""}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="workplace"
          />
          <div className="details_header">Education</div>
          <Detail
            value={details && details.highSchool ? details.highSchool : ""}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="high school"
          />
          <Detail
            value={details && details.college ? details.college : ""}
            img="studies"
            placeholder="Add a college"
            name="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="college"
          />
          <div className="details_header">Current city</div>
          <Detail
            value={details && details.currentCity ? details.currentCity : ""}
            img="home"
            placeholder="Add current city"
            name="currentCity"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="current city"
          />
          <div className="details_header">Hometown</div>
          <Detail
            value={details && details.hometown ? details.hometown : ""}
            img="home"
            placeholder="Add hometown"
            name="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="hometown"
          />
          <div className="details_header">Relationship</div>
          <Detail
            value={details && details.relationship ? details.relationship : ""}
            img="relationship"
            placeholder="Add a relationship"
            name="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="relationship"
            rel
          />
          <div className="details_header">Instagram</div>
          <Detail
            value={details && details.instagram ? details.instagram : ""}
            img="instagram"
            placeholder="Add instagram"
            name="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="instagram"
          />
        </div>
      </div>
    </div>
  );
}

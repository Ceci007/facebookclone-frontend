import React, { Fragment } from "react";

const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
];

export default function ReactsPopup({ visible, setVisible, reactHandler }) {
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() =>
            setTimeout(() => {
              setVisible(true);
            }, 500)
          }
          onMouseLeave={() =>
            setTimeout(() => {
              setVisible(false);
            }, 500)
          }
        >
          {reactsArray.map((react, i) => (
            <Fragment key={i}>
              {react && (
                <div className="react" onClick={() => reactHandler(react.name)}>
                  <img src={react.image} alt={`${react.name} button`} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}

import React from "react";
import EmojiPickerBackground from "./EmojiPickerBackgrounds";

export default function ImagePreview({ user, text, setText }) {
  return (
    <div className="overflow_a">
      <EmojiPickerBackground
        user={user}
        text={text}
        setText={setText}
        type2
      ></EmojiPickerBackground>
    </div>
  );
}

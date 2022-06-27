import React, { useState, useEffect } from "react";
import Picker from "emoji-picker-react";

export default function EmojiPickerBackground({ text, textRef, setText }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();

    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <div className="post_emojis_wrap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="../../../icons/colorful.png" alt="colored text" />
      <i
        className="emoji_icon_large"
        onClick={() => setPicker((prev) => !prev)}
      ></i>
    </div>
  );
}

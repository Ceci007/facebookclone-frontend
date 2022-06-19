import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Return, Search } from "../../svg";

const SearchMenu = forwardRef(({ color }, ref) => {
  const [iconVisible, setIconVisible] = useState(true);
  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const focusInput = () => {
    setIsFocus(true);
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => setVisible(true),
      close: () => setVisible(false),
    };
  });

  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, [isFocus]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <div
            className="transparent-backdrop"
            onClick={() => setVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="header_left search_area scrollbar"
          >
            <div className="search_wrap">
              <div className="header_logo">
                <div
                  className="circle hover1"
                  onClick={() => setVisible(false)}
                >
                  <Return color={color} />
                </div>
              </div>
              <div className="search" onClick={focusInput}>
                {iconVisible && (
                  <div>
                    <Search color={color} />
                  </div>
                )}
                <input
                  type="text"
                  ref={inputRef}
                  placeholder="Search Facebook"
                  onFocus={() => setIconVisible(false)}
                  onBlur={() => setIconVisible(true)}
                />
              </div>
            </div>
            <div className="search_history_header">
              <span>Recent searches</span>
              <a>Edit</a>
            </div>
            <div className="search_history"></div>
            <div className="search_results scrollbar"></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default SearchMenu;

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Return, Search } from "../../svg";
import { search, addToSearchHistory } from "../../functions/user";

const SearchMenu = forwardRef(({ color, token }, ref) => {
  const [iconVisible, setIconVisible] = useState(true);
  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

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

  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults([]);
    } else {
      const res = await search(searchTerm, token);
      setResults(res);
    }
  };

  const addToSearchHistoryHandler = async (searchUser) => {
    const res = await addToSearchHistory(searchUser, token);
  };

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={searchHandler}
                  placeholder="Search Facebook"
                  onFocus={() => setIconVisible(false)}
                  onBlur={() => setIconVisible(true)}
                  autoFocus
                />
              </div>
            </div>
            <div className="search_history_header">
              <span>Recent searches</span>
              <button className="edit_link">Edit</button>
            </div>
            <div className="search_history"></div>
            <div className="search_results scrollbar">
              {results &&
                results.map((user, i) => (
                  <Link
                    to={`/profile/${user.username}`}
                    className="search_user_item hover1"
                    key={i}
                    onClick={() => addToSearchHistoryHandler(user._id)}
                  >
                    <img src={user.picture} />
                    <span>
                      {user.first_name} {user.last_name}
                    </span>
                  </Link>
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default SearchMenu;

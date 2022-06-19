import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import SettingsPrivacy from "./SettingsPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
import useClickOutside from "../../../helpers/clickOutside";

export default function userMenuRef({ user, setUserMenuActive }) {
  const [visible, setVisible] = useState(0);
  const userMenuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useClickOutside(userMenuRef, () => {
    userMenuRef.current.style.display = "none";
    if (userMenuRef.current.style.display === "none") {
      setUserMenuActive(false);
    }
  });

  const logout = () => {
    Cookies.set("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <AnimatePresence>
      {user ? (
        <motion.div
          initial={{ height: "0" }}
          animate={{
            height: "auto",
            transition: { duration: 0.3 },
          }}
          exit={{ height: "0", transition: { duration: 0.3 } }}
          className="menu"
          ref={userMenuRef}
        >
          {visible === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.2, duration: 0.3 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <Link to="/profile" className="menu_header hover3">
                <img src={user.picture} alt="" />
                <div className="menu_col">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                  <span>See your profile</span>
                </div>
              </Link>
              <div className="menu_splitter"></div>
              <div className="menu_main hover3">
                <div className="small_circle">
                  <i className="report_filled_icon"></i>
                </div>
                <div className="menu_col">
                  <div className="menu_span1">Give feedback</div>
                  <div className="menu_span2">Help us improve facebook</div>
                </div>
              </div>
              <div className="menu_splitter"></div>
              <div className="menu_item hover3" onClick={() => setVisible(1)}>
                <div className="small_circle">
                  <i className="settings_filled_icon"></i>
                </div>
                <span>Settings & privacy</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </div>
              <div className="menu_item hover3" onClick={() => setVisible(2)}>
                <div className="small_circle">
                  <i className="help_filled_icon"></i>
                </div>
                <span>Help & support</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </div>
              <div className="menu_item hover3" onClick={() => setVisible(3)}>
                <div className="small_circle">
                  <i className="dark_filled_icon"></i>
                </div>
                <span>Display & Accessibility</span>
                <div className="rArrow">
                  <i className="right_icon"></i>
                </div>
              </div>
              <div className="menu_item hover3" onClick={() => logout()}>
                <div className="small_circle">
                  <i className="logout_filled_icon"></i>
                </div>
                <span>Logout</span>
              </div>
            </motion.div>
          )}
          {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
          {visible === 2 && <HelpSupport setVisible={setVisible} />}
          {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

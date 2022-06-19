import React from "react";
import { motion } from "framer-motion";

export default function SettingsPrivacy({ setVisible }) {
  return (
    <div className="absolute_wrap">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2, duration: 0.3 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div className="absolute_wrap_header">
          <div className="circle hover1" onClick={() => setVisible(0)}>
            <i className="arrow_back_icon"></i>
          </div>
          Settings & privacy
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="settings_filled_icon"></i>
          </div>
          <span>Settings</span>
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="privacy_checkup_icon"></i>
          </div>
          <span>Privacy Chekup</span>
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="privacy_shortcuts_icon"></i>
          </div>
          <span>Privacy Shortcuts</span>
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="activity_log_icon"></i>
          </div>
          <span>Activity log</span>
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="news_icon"></i>
          </div>
          <span>News Feed Prefrences</span>
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="language_icon"></i>
          </div>
          <span>Language</span>
        </div>
      </motion.div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

export default function HelpSupport({ setVisible }) {
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
          <div
            className="circle hover1"
            onClick={() => {
              setVisible(0);
            }}
          >
            <i className="arrow_back_icon"></i>
          </div>
          Help & Support
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="help_center_icon"></i>
          </div>
          <span>Help Center</span>
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="email_icon"></i>
          </div>
          <span>Support Inbox</span>
        </div>
        <div className="menu_item hover3">
          <div className="small_circle">
            <i className="info_filled_icon"></i>
          </div>
          <span>Report a Problem</span>
        </div>
      </motion.div>
    </div>
  );
}

import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menu, create } from "../../data/allMenu";
import AllMenuItem from "./AllMenuItem";

const AllMenu = ({ setShowAllMenu }) => {
  return (
    <AnimatePresence>
      (
      <>
        <div
          className="transparent-backdrop"
          onClick={() => setShowAllMenu(false)}
        />
        <motion.div
          initial={{ height: "0", opacity: 1 }}
          animate={{
            height: "90vh",
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          exit={{ height: "0", opacity: 0, transition: { duration: 0.3 } }}
          className="all_menu"
        >
          <div className="all_menu_header">Menu</div>
          <div className="all_menu_wrap scrollbar">
            <div className="all_left">
              <div className="all_menu_search">
                <i className="amm_s_ic"></i>
                <input type="text" placeholder="Search Menu" />
              </div>
              <div className="all_menu_group">
                <div className="all_menu_group_header">Social</div>
                {menu.slice(0, 6).map((item, i) => (
                  <AllMenuItem
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                    key={i}
                  />
                ))}
              </div>
              <div className="all_menu_group">
                <div className="all_menu_group_header">Entertainment</div>
                {menu.slice(6, 9).map((item, i) => (
                  <AllMenuItem
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                    key={i}
                  />
                ))}
              </div>
              <div className="all_menu_group">
                <div className="all_menu_group_header">Shopping</div>
                {menu.slice(9, 11).map((item, i) => (
                  <AllMenuItem
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                    key={i}
                  />
                ))}
              </div>
              <div className="all_menu_group">
                <div className="all_menu_group_header">Personal</div>
                {menu.slice(11, 15).map((item, i) => (
                  <AllMenuItem
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                    key={i}
                  />
                ))}
              </div>
              <div className="all_menu_group">
                <div className="all_menu_group_header">Professional</div>
                {menu.slice(15, 17).map((item, i) => (
                  <AllMenuItem
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                    key={i}
                  />
                ))}
              </div>
              <div className="all_menu_group">
                <div className="all_menu_group_header">Community Resources</div>
                {menu.slice(17, 21).map((item, i) => (
                  <AllMenuItem
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                    key={i}
                  />
                ))}
              </div>
              <div className="all_menu_group">
                <div className="all_menu_group_header">More from Meta</div>
                {menu.slice(21, 23).map((item, i) => (
                  <AllMenuItem
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                    key={i}
                  />
                ))}
              </div>
            </div>
            <motion.div
              initial={{ height: "0" }}
              animate={{
                height: "550px",
                transition: { delay: 0.2, duration: 0.3 },
              }}
              exit={{ height: "0", transition: { duration: 0.3 } }}
              className="all_right"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.3 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="all_right_header"
              >
                Create
              </motion.div>
              {create.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.3, duration: 0.3 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="all_right_item hover1"
                  key={i}
                >
                  <div className="all_right_circle">
                    <i className={item.icon}></i>
                  </div>
                  {item.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </>
      )
    </AnimatePresence>
  );
};

export default AllMenu;

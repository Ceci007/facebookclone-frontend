import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import React, { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import UserMenu from "./userMenu";

export default function Header() {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [allMenuActive, setAllMenuActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);

  const allMenuRef = useRef();
  const searchMenuRef = useRef();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAllMenuActive = () => {
    allMenuRef.current.toggle();
    setAllMenuActive((prev) => !prev);
  };

  const handleUserMenuActive = () => {
    setShowUserMenu((prev) => !prev);
    if (!showUserMenu) {
      setUserMenuActive(true);
    } else {
      setUserMenuActive(false);
    }
  };

  return (
    <>
      <header>
        <div className="header_left">
          <Link to="/" className="header_logo">
            <div className="circle">
              <Logo />
            </div>
          </Link>
          <div
            className="search search1"
            onClick={() => searchMenuRef.current.open()}
          >
            <Search color={color} />
            <input
              type="text"
              placeholder="Search Facebook"
              className="hide_input"
            />
          </div>
        </div>
        <div className="header_middle">
          <Link to="/" className="middle_icon active">
            <HomeActive />
          </Link>
          <Link to="/" className="middle_icon hover1">
            <Friends color={color} />
          </Link>
          <Link to="/" className="middle_icon hover1">
            <Watch color={color} />
            <div className="middle_notification">9+</div>
          </Link>
          <Link to="/" className="middle_icon hover1">
            <Market color={color} />
          </Link>
          <Link to="/" className="middle_icon hover1">
            <Gaming color={color} />
          </Link>
        </div>
        {user ? (
          <div className="header_right">
            <Link to="/profile" className="profile_link hover1">
              <img src={user.picture} alt="" />
              <span>{user.first_name}</span>
            </Link>
            <div>
              <div
                className={`circle_icon hover1 ${
                  allMenuActive && "active_header"
                }`}
                onClick={handleAllMenuActive}
              >
                <div style={{ transform: "translateY(2px)" }}>
                  <Menu />
                </div>
              </div>
            </div>
            <div className="circle_icon hover1">
              <Messenger />
            </div>
            <div className="circle_icon hover1">
              <Notifications />
              <div className="right_notification">5</div>
            </div>
            <div>
              <div
                className={`circle_icon hover1 ${
                  userMenuActive ? "active_header" : ""
                }`}
                onClick={handleUserMenuActive}
              >
                <div style={{ transform: "translateY(2px)" }}>
                  <ArrowDown />
                </div>
              </div>
              {showUserMenu && (
                <UserMenu
                  user={user}
                  setUserMenuActive={setUserMenuActive}
                  setShowUserMenu={setShowUserMenu}
                />
              )}
            </div>
          </div>
        ) : null}
      </header>
      <AllMenu ref={allMenuRef} />
      <SearchMenu color={color} ref={searchMenuRef} />
    </>
  );
}

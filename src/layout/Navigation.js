import React, { useState } from "react";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const hamburger = <FontAwesomeIcon icon={faBars} />;
  const closeHamburger = <FontAwesomeIcon icon={faTimes} />;

  const [isClicked, setIsClicked] = useState(false);
  return (
    <nav>
      <div>
        <div className="logo">
          <NavLink className="navlink" to="/">
            SPORT NEWS
          </NavLink>
        </div>
      </div>

      <div
        className="hamburger"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        {isClicked ? closeHamburger : hamburger}
      </div>

      <ul className={isClicked ? "links" : "closed"}>
        <li
          className="link"
          onClick={() => {
            setIsClicked((isClicked) => (isClicked = false));
          }}
        >
          <NavLink to="/">POSTS</NavLink>
        </li>
        <li
          className="link"
          onClick={() => {
            setIsClicked((isClicked) => (isClicked = false));
          }}
        >
          <NavLink to="/add">ADD POST</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

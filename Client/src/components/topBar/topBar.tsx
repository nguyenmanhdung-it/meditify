import "./topBar.scoped.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// rfc

export default function TopBar(props: any): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  
  const user = useSelector((state: any) => state.user);
  var login = props.login;
  const handleClick = (event: any) => {
    var menuu = document.getElementById("menuu");
    if (menuu !== null) {
      if (menuu.style.transform != "translateX(0%)") {
        menuu.style.transform = "translateX(0%)";
      } else {
        menuu.style.transform = "translateX(-250%)";
      }
    }
    var toggleIcon = document.getElementById("menuIcon");
    if (toggleIcon !== null) {
      if (toggleIcon.className != "menuIcon toggle") {
        toggleIcon.className += " toggle";
      } else {
        toggleIcon.className = "menuIcon";
      }
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="top">
      <nav id="navbar" className="">
        <div className="nav-wrapper">
          <div className="logo">
            <a href="http://localhost:3000/home">
              <i className="fa fa-angellist"></i> MEDITIFY
            </a>
          </div>
          <ul id="menu">
            <li>
              <a href="http://localhost:3000/home">Home</a>
            </li>
            <li>
              <a href="http://localhost:3000/writev2">writev2</a>
            </li>
            {/* <li>
              <a href="http://localhost:3000/Search">Search</a>
            </li> */}
            <li>
              <a href="http://localhost:3000/write">write</a>
            </li>
            {/* <li>
              <a href="Logout">Logout</a>
            </li> */}

            <li>
              {login ? (
                <a onClick={logout}>Logout</a>
              ) : (
                <a href="Login">Login</a>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div className="topRight">
        <a href="http://localhost:3000/settings">
          {login ? (
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://scontent.fhan5-3.fna.fbcdn.net/v/t1.15752-9/120143669_390799721933583_4965595528412418109_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=it8zitdVouwAX_mH3EK&_nc_ht=scontent.fhan5-3.fna&oh=03_AVLR5HhxfAbHbXn1IiBUmUZO9t0NgB9ULeeAp6zwaqI9Iw&oe=62FB17FC"
              }
              width="200"
              alt="Profile Image"
              className="topImg"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://media3.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif";
              }}
            />
          ) : (
            ""
          )}
        </a>
        {login ? (
          <div
            className="topIcon1 fa fa-search"
            // onclick showing search bar by changing the style
            onClick={() => {
              var searchInput = document.getElementById("searchInput");
              if (searchInput !== null) {
                if (searchInput.style.display != "block") {
                  searchInput.style.display = "block";
                }
                //  if to div .topIcon1 is clicked then search bar will be hidden
                
              }
            }}
          >
            {/* <input
              id="searchInput"
              type="text"
              placeholder="Search"
              className="topSearchInput"
              onKeyDown={async (e) => {
                if (e.keyCode === 13) {
                  console.log(e.target.value);
                }
              }}
            /> */}
          </div>
        ) : (
          <i className="topIcon fa fa-search" aria-hidden="true"></i>
        )}
      </div>

      <div className="menuIcon" id="menuIcon" onClick={handleClick}>
        <span className="icon icon-bars"></span>
        <span className="icon icon-bars overlay"></span>
      </div>

      <div className="overlay-menu" id="menuu">
        <ul id="menu">
          <li>
            <a href="home">Home</a>
          </li>
          <li>
            <a href="http://localhost:3000/writev2">writev2</a>
          </li>

          <li>
            <a href="http://localhost:3000/search">Search</a>
          </li>

          <li>
            {login ? <a onClick={logout}>Logout</a> : <a href="Login">Login</a>}
          </li>
          <li>
            <a href="http://localhost:3000/write">write</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

import "./Header.css";
import userAvatar from "../../assets/images/avatar.png";
import { useState } from "react";

function Header(): JSX.Element {
  const [showProfileMenu, toggleProfileMenu] = useState(false);

  const handleProfileClick = () => {
    toggleProfileMenu(!showProfileMenu);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">Awesome Kanban Board</a>
        </div>

        <div className="profile__container">
          <div className="profile__avatar">
            <img src={userAvatar} alt="user avatar" />
          </div>
          <button className="profile__arrow" onClick={handleProfileClick}>
            {showProfileMenu ? (
              <svg
                className="arrow__down"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                className="arrow__up"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z"
                  fill="white"
                />
              </svg>
            )}
          </button>

          {showProfileMenu ? (
            <div className="profile__menu">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="7.7782"
                  width="11"
                  height="11"
                  transform="rotate(45 7.7782 0)"
                  fill="white"
                />
              </svg>

              <a href="#">Profile</a>
              <a href="#">Log Out</a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

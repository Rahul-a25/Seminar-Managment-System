import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftHeaderContent}>
          <div className={styles.headerHeading}>Seminar Management System</div>
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            &#9776;
          </button>
        </div>
        <div className={styles.rightHeaderContent}>
          <svg
            className={styles.profileSvg}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            id="user"
          >
            <g fill="#2b4255" transform="translate(838 -946.115)">
              <circle cx="-830" cy="950.126" r="4"></circle>
              <path d="M-823.997 959.123v2.982h-12.006v-2.982"></path>
              <path d="M-823.997 959.598v-2.19c0-1.264-1.116-2.282-2.502-2.282h-7.002c-1.386 0-2.502 1.018-2.502 2.282v2.19"></path>
            </g>
          </svg>
          <span className={styles.username}>Username</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

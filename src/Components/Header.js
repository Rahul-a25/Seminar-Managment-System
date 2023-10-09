import React from "react";
import styles from "./header.module.css";

const Header = () => {
  const toggleSidebar = () => {
    console.log("header sidebar clicked");
  };

  return (
    <div className={styles.header}>
      <div className="left">
        <button className={styles.hamburgerButton} onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className="right">
        <div className={styles.userInfo}>
          <span className="username">Username</span>
          <span className={styles.userIcon}>👤</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [subitemsOpen, setSubitemsOpen] = useState([false, false, false]);

  const toggleSubitems = (index) => {
    const updatedSubitemsOpen = [...subitemsOpen];
    updatedSubitemsOpen[index] = !updatedSubitemsOpen[index];
    setSubitemsOpen(updatedSubitemsOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      <ul className={styles.itemList}>
        <li className={styles.searchContainer}>
          <span className={styles.searchIcon}>&#128269;</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search Page"
          />
        </li>

        <li className={styles.folderItem}>
          <div className={styles.itemHeader}>
            <div className={styles.innerItemHeader}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svgFolder}
                x="0px"
                y="0px"
                width={100}
                height={100}
                viewBox="0,0,256,256"
              >
                <g
                  fill="#b8c7ce"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth={1}
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit={10}
                  strokeDasharray
                  strokeDashoffset={0}
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M20,6h-8l-2,-2h-6c-1.1,0 -2,0.9 -2,2v12c0,1.1 0.9,2 2,2h16c1.1,0 2,-0.9 2,-2v-10c0,-1.1 -0.9,-2 -2,-2z" />
                  </g>
                </g>
              </svg>
              <div>Content Management</div>
            </div>
            <button
              className={styles.toggleButtonList}
              onClick={() => toggleSubitems(0)}
            >
              <svg
                className={`${styles.arrowIcon} ${
                  subitemsOpen[0] ? styles.open : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>
          <ul
            className={`${styles.subItemList} ${
              subitemsOpen[0] ? styles.open : ""
            }`}
          >
            <li>Subitem 1</li>
            <li>Subitem 2</li>
          </ul>
        </li>
        <li className={styles.folderItem}>
          <div className={styles.itemHeader}>
            <div className={styles.innerItemHeader}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svgFolder}
                x="0px"
                y="0px"
                width={100}
                height={100}
                viewBox="0,0,256,256"
              >
                <g
                  fill="#b8c7ce"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth={1}
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit={10}
                  strokeDasharray
                  strokeDashoffset={0}
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M20,6h-8l-2,-2h-6c-1.1,0 -2,0.9 -2,2v12c0,1.1 0.9,2 2,2h16c1.1,0 2,-0.9 2,-2v-10c0,-1.1 -0.9,-2 -2,-2z" />
                  </g>
                </g>
              </svg>
              <div>Reports</div>
            </div>
            <button
              className={styles.toggleButtonList}
              onClick={() => toggleSubitems(1)}
            >
              <svg
                className={`${styles.arrowIcon} ${
                  subitemsOpen[1] ? styles.open : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>
          <ul
            className={`${styles.subItemList} ${
              subitemsOpen[1] ? styles.open : ""
            }`}
          >
            <li>Subitem 1</li>
            <li>Subitem 2</li>
          </ul>
        </li>
        <li className={styles.folderItem}>
          <div className={styles.itemHeader}>
            <div className={styles.innerItemHeader}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svgFolder}
                x="0px"
                y="0px"
                width={100}
                height={100}
                viewBox="0,0,256,256"
              >
                <g
                  fill="#b8c7ce"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth={1}
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit={10}
                  strokeDasharray
                  strokeDashoffset={0}
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M20,6h-8l-2,-2h-6c-1.1,0 -2,0.9 -2,2v12c0,1.1 0.9,2 2,2h16c1.1,0 2,-0.9 2,-2v-10c0,-1.1 -0.9,-2 -2,-2z" />
                  </g>
                </g>
              </svg>
              <div>Settings</div>
            </div>
            <button
              className={styles.toggleButtonList}
              onClick={() => toggleSubitems(2)}
            >
              <svg
                className={`${styles.arrowIcon} ${
                  subitemsOpen[2] ? styles.open : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>
          <ul
            className={`${styles.subItemList} ${
              subitemsOpen[2] ? styles.open : ""
            }`}
          >
            <li>Subitem 1</li>
            <li>Subitem 2</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

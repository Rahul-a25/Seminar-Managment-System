import React, { useState } from "react";
import "./sidebaritems.css";
import { Link } from "react-router-dom";

const SidebarItems = ({ item }) => {
  const [open, setOpen] = useState(false);

  // hover styling

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const shouldOpen = item.childrens && isHovered;
  //   hover end

  if (item.childrens) {
    return (
      <div
        className={shouldOpen ? "sidebar-item open" : "sidebar-item"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItems key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link to={item.path || "#"} className="sidebar-item plain">
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </Link>
    );
  }

  // without hover

  // if(item.childrens){
  //     return (
  //         <div className={open ? "sidebar-item open" : "sidebar-item"}>
  //             <div className="sidebar-title">
  //                 <span>
  //                     { item.icon && <i className={item.icon}></i> }
  //                     {item.title}
  //                 </span>
  //                 <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
  //             </div>
  //             <div className="sidebar-content">
  //                 { item.childrens.map((child, index) => <SidebarItems key={index} item={child} />) }
  //             </div>
  //         </div>
  //     )
  // }else{
  //     return (
  //         <Link to={item.path || "#"} className="sidebar-item plain">
  //             { item.icon && <i className={item.icon}></i> }
  //             {item.title}
  //         </Link>
  //     )
  // }
};

export default SidebarItems;

import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { baseUrl, token2 } from "../../../../Constants/network";

const AddNewCategory = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [allData, setAllData] = useState({
    eventCategoryName: "",
    showInOrder: "",
    isPublished: false,
  });

  let baseState = {
    eventCategoryName: "",
    showInOrder: "",
    isPublished: false,
  };

  const [submitdata, setSubmitdata] = useState(null);

  const changedata = (e) => {
    const { name, value, type, checked } = e.target;
    setAllData({ ...allData, [name]: type === "checkbox" ? checked : value });
  };

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}api/v1/EventCategory`, allData, {
        headers: { Authorization: `Bearer ${token2}` },
      })
      .then((response) => {
        setSubmitdata(response.data.message);
        setAllData(baseState);
        document.getElementById("EventCategory").reset();
      });
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Event Categories Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form id="EventCategory" className="form-container" onSubmit={Submit}>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Category Name :</label>
              <input
                type="text"
                id="eventCategoryName"
                name="eventCategoryName"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Show In Order :</label>
              <input
                type="text"
                id="showInOrder"
                name="showInOrder"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Is Published:</label>
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                style={{ height: "14px" }}
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">
                Submit
              </button>
              {submitdata === "success" && (
                <p className="success-message">
                  Category created successfully!
                </p>
              )}
              {submitdata && <p>{submitdata}</p>}
              {submitdata === "error" && (
                <p className="error-message">
                  Error creating category. Please try again
                </p>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNewCategory;

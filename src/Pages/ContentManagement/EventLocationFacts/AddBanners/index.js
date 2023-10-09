import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";

const AddBanners = () => {
  const countryNames = getNames();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Location Facts Banners</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Name :</label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Banner Title :</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Banner Description :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Banner Image :</label>
              <input type="file" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Banner Redirect Url :</label>
              <input type="text" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Is Published :</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Show In Order :</label>
              <input type="text" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddBanners;

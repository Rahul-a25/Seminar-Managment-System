import React, { useState } from "react";
import styles from "./styles.module.css";

const AddNewPaper = () => {
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
        <div className="title">Paper Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            
            <div className="form-col">
              <label className="mandatory-label">Event Name :</label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Abstract Paper Title :</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Author :</label>
              <input type="text" />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Abstract paper Description :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
            </div>
          </div>
          <div className="form-row">
          <div className="form-col">
              <label>Event Paper Url :</label>
              <input type="text" />
            </div>
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Is Published:</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
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

export default AddNewPaper;

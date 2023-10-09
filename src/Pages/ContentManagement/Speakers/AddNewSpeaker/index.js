import React, { useState } from "react";
import styles from "./styles.module.css";

const AddNewSpeaker = () => {
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
        <div className="title">Speaker Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            
            <div className="form-col">
              <label className="mandatory-label">Event Name : </label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Speaker Title :</label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Speaker Name :</label>
              <input type="text" required />
            </div>
            <div className="form-col">
              <label >Company Name :</label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
          <div className="form-col">
              <label>Designation :</label>
              <input type="text" required />
            </div>
            <div className="form-col">
              <label >Email :</label>
              <input type="email" required />
            </div>
          </div>

          <div className="form-row">
          <div className="form-col">
              <label >Contact No :</label>
              <input type="number" required />
            </div>

            <div className="form-col">
              <label >Speaker Abstract :</label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
          <div className="form-col">
              <label>Profile Pic :</label>
              <input type="file" />
            </div>
            <div className="form-col">
              <label>Biography :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                
              ></textarea>
            </div>
          </div>
          <div className="form-row">
          <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Is Published:</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
            </div>

            <div className="form-col">
              <label>Show In Order :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">List As Speaker :</label>
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

export default AddNewSpeaker;

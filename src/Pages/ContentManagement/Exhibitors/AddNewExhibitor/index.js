import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";

const AddNewExhibitor = () => {
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
        <div className="title">Exhibitor Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            
            <div className="form-col">
              <label className="mandatory-label">Event Name : :</label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Exhibitor Name :</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Exhibitor Short Name :</label>
              <input type="text" />
            </div>
            <div className="form-col">
              <label>Geo Lat :</label>
              <input type="text" />
            </div>
            
          </div>
          <div className="form-row">
          <div className="form-col">
              <label>Geo Long :</label>
              <input type="text" />
            </div>
          <div className="form-col">
              <label>Exhibitor Description :</label>
              <input type="text" />
            </div>
            
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Exhibitor Address :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
            </div>

            <div className="form-col">
              <label className="mandatory-label">Country :</label>
              <select
                id="countryName"
                required
              >
                <option value="">Select a country</option>
                {countryNames.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
          <div className="form-col">
              <label className="mandatory-label">Exhibitor City :</label>
              <select
              required
                id="countryName"
              >
                <option value="">Select</option>
                {countryNames.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-col">
              <label>Pin Code :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Email Id :</label>
              <input type="email" />
            </div>

            <div className="form-col">
              <label>Exhibitor Logo :</label>
              <input type="file" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Stall No :</label>
              <input type="text" />
            </div>

            <div className="form-col">
              <label>Exhibitor web Url :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Contact Person :</label>
              <input type="text" />
            </div>

            <div className="form-col">
              <label>Contact Person No :</label>
              <input type="number" />
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

export default AddNewExhibitor;

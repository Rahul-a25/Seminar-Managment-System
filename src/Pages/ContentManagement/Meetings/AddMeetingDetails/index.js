import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";
import { State, City } from "country-state-city";

const AddMeetingDetails = () => {
  const countryNames = getNames();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const states = State.getStatesOfCountry("IN");
  const [selected, setSelected] = useState({
    state: "",
    city: "",
  });
  const cities = City.getCitiesOfState("IN", selected.state);

  const handleChange = (e) => {
    // Get the name and value of the target element
    const { name, value } = e.target;
    // Update the state variable with the new value
    setSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Use map method to create option elements for states and cities
  const stateOptions = states.map((state) => (
    <option key={state.isoCode} value={state.isoCode}>
      {state.name}
    </option>
  ));

  const cityOptions = cities.map((city) => (
    <option key={city.name} value={city.name}>
      {city.name}
    </option>
  ));

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Meeting Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event :</label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Title :</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label >Description :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                
              ></textarea>
            </div>
            <div className="form-col">
              <label>From Date :</label>
              <input type="date" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label >To Date :</label>
              <input type="date" />
            </div>
            <div className="form-col">
              <label >From Time :</label>
              <input type="time" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>To Time :</label>
              <input type="time" />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Country :</label>
              <select id="countryName" required>
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
              <label>State :</label>
              <select
                name="state"
                id="state"
                className="form-control"
                value={selected.state}
                onChange={handleChange}
                
              >
                <option value="">Select State</option>
                {stateOptions}
              </select>
            </div>
            <div className="form-col">
              <label>City :</label>
              <select
                name="city"
                id="city"
                className="form-control"
                value={selected.city}
                onChange={handleChange}
              >
                <option value="">City</option>
                {cityOptions}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Address :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                
              ></textarea>
            </div>
            <div className="form-col">
              <label >Pin Code :</label>
              <input type="text"  />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label >Meeting By :</label>
              <input type="text"  />
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

export default AddMeetingDetails;

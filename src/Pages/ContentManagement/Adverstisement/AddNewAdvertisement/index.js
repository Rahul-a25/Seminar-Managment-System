import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";
import { State, City } from "country-state-city";

const AddNewAdvertisement = () => {
  const countryNames = getNames();
  const states = State.getStatesOfCountry("IN");
  const [isExpanded, setIsExpanded] = useState(true);
  const [selected, setSelected] = useState({
    state: "",
    city: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  // Get the list of cities for the selected state
  const cities = City.getCitiesOfState("IN", selected.state);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Advertisment Details</div>
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
              <label>Short Name :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Ad Title :</label>
              <input type="text" required/>
            </div>
            <div className="form-col">
              <label >Address :</label>
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
              <label>Ad Logo path :</label>
              <input type="text" />
            </div>
            <div className="form-col">
              <label >Geo Lat :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label >Geo Long :</label>
              <input type="text"  />
            </div>
            <div className="form-col">
              <label >Ad Description :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                
              ></textarea>
            </div>
          </div>

          <div className="form-row">
            {/* <div className="form-col">
              <label htmlFor="countryName">Country :</label>
              <select id="countryName">
                <option value="">Select a country</option>
                {countryNames.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div> */}
            {/* <div className="form-col">
              <label className="mandatory-label">Ad City :</label>
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
            </div> */}
            <div className="form-col">
              <label>Ad City :</label>
              <select
                name="city"
                id="city"
                className="form-control"
                value={selected.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cityOptions}
              </select>
            </div>
          </div>
          <div className="form-col">
              <label>Ad Address :</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                
              ></textarea>
            </div>
          <div className="form-row">
            
            <div className="form-col">
              <label>Ad from Date :</label>
              <input type="date" />
            </div>
            <div className="form-col">
              <label >Ad to Date :</label>
              <input type="date"  />
            </div>
          </div>
          <div className="form-row">
           
            <div className="form-col">
              <label >Ad Web Url :</label>
              <input type="text"  />
            </div>
            <div className="form-col">
              <label >Contact Person :</label>
              <input type="text"  />
            </div>
          </div>

          <div className="form-row">
            

            <div className="form-col">
              <label >Contact Person No :</label>
              <input type="text" />
            </div>
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
              <label >Show In Order :</label>
              <input type="text" />
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

export default AddNewAdvertisement;

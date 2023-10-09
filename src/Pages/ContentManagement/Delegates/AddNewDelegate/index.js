import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";
import { State, City } from "country-state-city";

const AddNewDelegate = () => {
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
        <div className="title">Delegate Details</div>
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
              <label className="mandatory-label">Company Code :</label>
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
              <label className="mandatory-label">Company Name :</label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Delegate Category :</label>
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
              <label className="mandatory-label">Email Id :</label>
              <input type="text" required />
            </div>
            <div className="form-col">
              <label>Alternate Email Id :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Delegate Title :</label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">First Name:</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Middle Name :</label>
              <input type="text" />
            </div>
            <div className="form-col">
              <label>Last Name :</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Delegate login Id :</label>
              <input type="text" required />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Delegate Password :</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Address 1:</label>
              <input type="text" required />
            </div>
            <div className="form-col">
              <label>Address 2:</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="countryName">Country :</label>
              <select id="countryName">
                <option value="">Select a country</option>
                {countryNames.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-col">
              <label>State :</label>
              <select
                name="state"
                id="state"
                className="form-control"
                value={selected.state}
                onChange={handleChange}
                
              >
                <option value="">State</option>
                {stateOptions}
              </select>
            </div>
            
          </div>
          <div className="form-row">
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
            <div className="form-col">
              <label>Pin Code:</label>
              <input type="text"  />
            </div>
            
          </div>
          <div className="form-row">
          <div className="form-col">
              <label >Mobile No:</label>
              <input type="text"  />
            </div>
            <div className="form-col">
              <label >Profile Pic:</label>
              <input type="file"  />
            </div>
           
          </div>

          <div className="form-row">
          <div className="form-col">
              <label >Designation:</label>
              <input type="text"  />
            </div>
            <div className="form-col">
              <label >About My self :</label>
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
              <label htmlFor="checkbox">Show Email:</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
            </div>
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox ">Show Contact No :</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
            </div>

            
          </div>
          <div className="form-row">
          <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Open For Appointment :</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
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
          <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Send Mail :</label>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                style={{ height: "14px" }}
              />
            </div>
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Payment :</label>
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
              <label >Receipt No :</label>
              <input type="text"  />
            </div>
            <div className="form-col">
              <label >Sponsorer :</label>
              <input type="text"  />
            </div>

            
          </div>
          <div className="form-row">
          <div className="form-col">
              <label >Currency :</label>
              <input type="text"  disabled/>
            </div>
            <div className="form-col">
              <label >Seminar Fee :</label>
              <input type="text"  disabled/>
            </div>

            
          </div>
          <div className="form-row">
          <div className="form-col">
              <label >Remarks :</label>
              <input type="text" />
            </div>
            <div className="form-col">
              <label >Registration No :</label>
              <input type="text"  />
            </div>

            
          </div>
          <div className="form-row">

            <div className="form-col">
              <label >Show In Order :</label>
              <input type="text"  />
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


export default AddNewDelegate;

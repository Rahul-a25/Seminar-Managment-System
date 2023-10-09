import React, { useState } from "react";
import styles from "./styles.module.css";
import { baseUrl, token6 } from "../../../../Constants/network";
import axios from "axios";

const AddNewEvent = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // axios
  const [alldata, setAlldata] = useState({
    eventOrganiserId: "6507e1ebcd2a8a2978799e71",
    eventCategoryId: "",
    eventName: "",
    eventDescription: "",
    eventCountryId: "",
    eventCityId: "",
    eventAddress: "",
    eventFromDate: "",
    eventToDate: "",
    lat: "",
    long: "",
    image: "",
    isPublished: "",
    showInOrder: "",
  });

  let baseState = {
    eventOrganiserId: "6507e1ebcd2a8a2978799e71",
    eventCategoryId: "",
    eventName: "",
    eventDescription: "",
    eventCountryId: "",
    eventCityId: "",
    eventAddress: "",
    eventFromDate: "",
    eventToDate: "",
    lat: "",
    long: "",
    image: "",
    isPublished: "",
    showInOrder: "",
  };

  const [submitdata, setSubmitdata] = useState(null);

  const changedata = (e) => {
    const { name, value, type, checked } = e.target;
    setAlldata({ ...alldata, [name]: type === "checkbox" ? checked : value });
  };

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}api/v1/Event`, alldata, {
        headers: { Authorization: `Bearer ${token6}` },
      })
      .then((response) => {
        setSubmitdata(response.data.message);
        setAlldata(baseState);
        document.getElementById("Event").reset();
      });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Event Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container" onSubmit={Submit} id="Event">
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Organizer :</label>
              <input
                value={alldata?.eventOrganiserId}
                id="eventOrganiserId"
                type="text"
                required
                name="eventOrganiserId"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Event Category Name : </label>
              <select
                required
                name="eventCategoryId"
                id="eventCategoryId"
                onChange={changedata}
                value={alldata?.eventCategoryId}>
                <option value="">--select--</option>
                <option value="64f85947b0ebae07dcdcbdb6">Awardees</option>
                <option value="64f85a85a0420b14445eed2c">Asso_Mem</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Name :</label>
              <input
                id="eventName"
                type="text"
                required
                name="eventName"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Event Description :</label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                rows="4"
                cols="50"
                onChange={changedata}
                required></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Country id : </label>
              <select
                required
                name="eventCountryId"
                id="eventCountryId"
                onChange={changedata}
                value={alldata?.eventCountryId}>
                <option value="">--select--</option>
                <option value="6505879c4d50f7c6053f8efd">India 1</option>
                <option value="650587ac4d50f7c6053f8f00">Pakistan 2</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Event City : </label>
              <select
                required
                name="eventCityId"
                id="eventCityId"
                value={alldata?.eventCityId}
                onChange={changedata}>
                <option value="">--select--</option>
                <option value="6505885d84f707da1a6c0769">Bangalore</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Address :</label>
              <input
                onChange={changedata}
                id="eventAddress"
                name="eventAddress"
                rows="4"
                cols="50"
                required></input>
            </div>

            <div className="form-col">
              <label className="mandatory-label">Event From Date :</label>
              <input
                id="eventFromDate"
                type="date"
                required
                name="eventFromDate"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event To Date :</label>
              <input
                id="eventToDate"
                type="date"
                required
                name="eventToDate"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Geo Lat :</label>
              <input
                type="text"
                id="lat"
                required
                name="lat"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Geo Long :</label>
              <input
                id="long"
                type="text"
                required
                name="long"
                onChange={changedata}
              />
            </div>

            <div className="form-col">
              <label>Mobile App Icon :</label>
              <input
                id="image"
                type="file"
                required
                name="image"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Is Published:</label>
              <input
                onChange={changedata}
                type="checkbox"
                id="isPublished"
                name="isPublished"
                style={{ height: "14px" }}
              />
            </div>
            <div className="form-col">
              <label>Show In Order :</label>
              <input
                type="text"
                required
                id="showInOrder"
                name="showInOrder"
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

export default AddNewEvent;

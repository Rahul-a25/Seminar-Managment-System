import React, { useState } from "react";
import styles from "./styles.module.css";
import axios, { all } from "axios";
import { baseUrl, token5 } from "../../../../Constants/network";

const AddNewSession = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // axios

  const [alldata, setAlldata] = useState({
    eventId: "6507eb6a9ca10beebc562986",
    sessionName: "",
    sessionTitle: "",
    sessionDate: "",
    sessionFromTime: "",
    sessionToTime: "",
    isPublished: "false",
  });

  let baseState = {
    eventId: "6507eb6a9ca10beebc562986",
    sessionName: "",
    sessionTitle: "",
    sessionDate: "",
    sessionFromTime: "",
    sessionToTime: "",
    isPublished: "false",
  };

  const [submitdata, setSubmitdata] = useState(null);

  const changedata = (e) => {
    const { name, value, type, checked } = e.target;
    setAlldata({ ...alldata, [name]: type === "checkbox" ? checked : value });
  };

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}api/v1/EventSession`, alldata, {
        headers: { Authorization: `Bearer ${token5}` },
      })
      .then((response) => {
        setSubmitdata(response.data.message);
        setAlldata(baseState);
        document.getElementById("EventSession").reset();
      });
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Event Theme Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container" id="EventSession" onSubmit={Submit}>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event Name :</label>
              <input
              value={alldata?.eventId}
                id="eventId"
                type="text"
                required
                name="eventId"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Session :</label>
              <input
                id="sessionName"
                type="text"
                required
                name="sessionName"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Session Title :</label>
              <input
                id="sessionTitle"
                type="text"
                required
                name="sessionTitle"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Session Date :</label>
              <input
                id="sessionDate"
                name="sessionDate"
                type="date"
                onChange={changedata}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">From Time :</label>
              <input
                id="sessionFromTime"
                type="time"
                required
                name="sessionFromTime"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">To Time :</label>
              <input
                type="time"
                required
                id="sessionToTime"
                name="sessionToTime"
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

export default AddNewSession;

import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { baseUrl, token4 } from "../../../../Constants/network";

const AddEventOrganizer = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [alldata, setAlldata] = useState({
    ShortName: "",
    OrgName: "",
    address: "",
    alternateAddress: "",
    image: "",
    contactPerson: "",
    contactPersonNo: "",
    isPublished: "",
    contactEmail: "",
    contactFax: "",
  });

  let baseState = {
    ShortName: "",
    OrgName: "",
    address: "",
    alternateAddress: "",
    image: "",
    contactPerson: "",
    contactPersonNo: "",
    isPublished: "",
    contactEmail: "",
    contactFax: "",
  };

  const [submitdata, setSubmitdata] = useState(null);

  const changedata = (e) => {
    const { name, value, type, checked } = e.target;
    setAlldata({ ...alldata, [name]: type === "checkbox" ? checked : value });
  };

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}api/v1/EventOrganiser`, alldata, {
        headers: { Authorization: `Bearer ${token4}` },
      })
      .then((response) => {
        setSubmitdata(response.data.message);
        setAlldata(baseState);
        document.getElementById("EventOrganiser").reset();
      });
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Event Organizer Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container" id="EventOrganiser" onSubmit={Submit}>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Org Short Name :</label>
              <input
                type="text"
                name="ShortName"
                onChange={changedata}
                id="ShortName"
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Org Name :</label>
              <input
                id="OrgName"
                type="text"
                name="OrgName"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Address :</label>
              <input
                id="address"
                type="text"
                name="address"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label>Alternate Address :</label>
              <input
                id="alternateAddress"
                type="text"
                name="alternateAddress"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Logo :</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Contact Person :</label>
              <input
                id="contactPerson"
                type="text"
                name="contactPerson"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Contact Person No :</label>
              <input
                id="contactPersonNo"
                type="number"
                name="contactPersonNo"
                onChange={changedata}
              />
            </div>
            <div className="form-col">
              <label>Contact Email :</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Contact Fax :</label>
              <input
                type="text"
                id="contactFax"
                name="contactFax"
                onChange={changedata}
              />
            </div>
            <div className="form-col checkbox-style">
              <label htmlFor="checkbox">Is Published:</label>
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                onChange={changedata}
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

export default AddEventOrganizer;

import React, { useState } from "react";
import "./styles.css";
import { getNames } from "country-list";
import { baseUrl, token3, tokken3 } from "../../../../Constants/network";
import axios from "axios";

const AddCity = () => {
  const countryNames = getNames();
  const [isExpanded, setIsExpanded] = useState(true);

  const [typeSelectedOption, setTypeSelectedOption] = useState("text");
  const [selectedOption, setSelectedOption] = useState("text");

  //for type select input
  const handleTypeSelectChange = (event) => {
    setTypeSelectedOption(event.target.value);
  };

  //for country select input
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // axios

  const [alldata, setAlldata] = useState({
    locationType: "",
    countryState: "",
    locationName: "",
  });

  const baseState = {
    locationType: "",
    countryState: "",
    locationName: "",
  };
  console.log(alldata);
  const [submitdata, setSubmitdata] = useState("");
  console.log(submitdata);
  const changedata = (e) => {
    const { name, value } = e.target;
    setAlldata({ ...alldata, [name]: value });
  };

  const Submit = (e) => {
    e.preventDefault();
    alert("Data successfully submited");
    axios
      .post(`${baseUrl}api/v1/location`, alldata, {
        headers: { Authorization: `Bearer ${token3}` },
      })
      .then((response) => {
        setSubmitdata(response.data.message);
        setAlldata(baseState);
        document.getElementById("location").reset();
      })
      .catch((error) => {
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error:", error.message);
        }
      });
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Location Details</div>
        <div className="title">City</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container" id="location" onSubmit={Submit}>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Select Type:</label>
              <select
                name="locationType"
                id="locationType"
                value={alldata?.locationType}
                onChange={changedata}
              >
                <option value="Delhi"> Delhi</option>
                <option value="Mumbai"> Mumbai</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Location Name:</label>
              <input
                type="text"
                id="locationName"
                name="locationName"
                onChange={changedata}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Country/State:</label>
              <select
                name="countryState"
                id="countryState"
                value={alldata?.countryState}
                onChange={changedata}
              >
                <option value="6505885d84f707da1a6c0769">Andhra Pradesh</option>
                <option value="Delhi"> Delhi</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <button type="submit" onClick={Submit} className="btn">
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

export default AddCity;

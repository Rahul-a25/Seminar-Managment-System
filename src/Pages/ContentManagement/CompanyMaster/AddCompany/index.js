import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";
import axios from "axios";
import { baseUrl, token } from "../../../../Constants/network";

const AddCompany = () => {
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

  // adding company

  const [companydata, setCompanydata] = useState({
    companyCategoryId: "64f85947b0ebae07dcdcbdb6",
    companyName: "",
    companyCode: "",
    address1: "",
    address2: "",
    countryId: "",
    stateCityId: "",
    pinCode: "",
    companyNameOnBatch: "",
    isdCode: "",
  });

  let baseState = {
    companyCategoryId: "64f85947b0ebae07dcdcbdb6",
    companyName: "",
    companyCode: "",
    address1: "",
    address2: "",
    countryId: "",
    stateCityId: "",
    pinCode: "",
    companyNameOnBatch: "",
    isdCode: "",
  };

  const [submitform, setSubmitform] = useState("");
  console.log(companydata);
  const changedata1 = (e) => {
    const { name, value } = e.target;
    setCompanydata({
      ...companydata,
      [name]: value,
    });
  };

  const alldata = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}api/v1/Company`, companydata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSubmitform(response.data.message);
        setCompanydata(baseState);
        document.getElementById("Company").reset();
      });
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Company Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container" id="Company" onSubmit={alldata}>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Category:</label>
              <select
                name="companyCategoryId"
                id="companyCategoryId"
                value={companydata?.companyCategoryId}
                onChange={changedata1}
              >
                <option value="64f85947b0ebae07dcdcbdb6">Awardees</option>
                <option value="64f85a85a0420b14445eed2c">Asso_Mem</option>
              </select>
            </div>
            <div className="form-col">
              <label className="mandatory-label">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                onChange={changedata1}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Company Code:</label>
              <input
                type="text"
                id="companyCode"
                name="companyCode"
                onChange={changedata1}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Address Line 1 :</label>
              <input
                type="text"
                id="address1"
                name="address1"
                onChange={changedata1}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Address Line 2 :</label>
              <input
                type="text"
                id="address2"
                name="address2"
                onChange={changedata1}
              />
            </div>
            <div className="form-col">
              <label className="mandatory-label">Country :</label>
              <select
                name="countryId"
                id="countryId"
                value={companydata?.countryId}
                onChange={changedata1}
              >
                <option value="">Select a country</option>
                <option value="6505879c4d50f7c6053f8efd">India</option>
                <option value="650587ac4d50f7c6053f8f00">Pakistan</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="countryName">City :</label>
              <select
                name="stateCityId"
                id="stateCityId"
                value={companydata?.stateCityId}
                onChange={changedata1}
              >
                <option value="">Select</option>
                <option value="6505885d84f707da1a6c0769">Bangalore</option>
              </select>
            </div>
            <div className="form-col">
              <label htmlFor="currency">Pincode :</label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                onChange={changedata1}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Company Name on Batch :</label>
              <input
                type="text"
                name="companyNameOnBatch"
                id="companyNameOnBatch"
                onChange={changedata1}
              />
            </div>
            <div className="form-col">
              <label htmlFor="currency">ISD Code :</label>
              <input
                type="number"
                id="isdCode"
                name="isdCode"
                onChange={changedata1}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">
                Submit
              </button>
              {submitform === "success" && (
                <p className="success-message">
                  Category created successfully!
                </p>
              )}
              {submitform && <p>{submitform}</p>}
              {submitform === "error" && (
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

export default AddCompany;

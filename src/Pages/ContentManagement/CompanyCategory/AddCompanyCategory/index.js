import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { baseUrl, token1 } from "../../../../Constants/network";

const AddCompanyCategory = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [alldata, setAlldata] = useState({
    categoryName: "",
    currency: "",
    seminarFee: "",
    isPublished: "",
  });

  let baseState = {
    categoryName: "",
    currency: "",
    seminarFee: "",
    isPublished: "",
  };
  console.log(alldata);
  const [submitdata, setSubmitdata] = useState("");
  console.log(submitdata);
  const changedata = (e) => {
    const { name, value, type, checked } = e.target;
    setAlldata({ ...alldata, [name]: type === "checkbox" ? checked : value });
  };

  const Submit = (e) => {
    e.preventDefault();
    alert("submit Data");
    axios
      .post(`${baseUrl}api/v1/company-categories`, alldata)
      .then((response) => {
        setSubmitdata(response.data.message);
        setAlldata(baseState);
        // document.getElementById("company-categories").reset();
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Category Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container" onSubmit={Submit} id="company">
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="categoryName" className="mandatory-label">
                Category Name:
              </label>
              <input
                type="text"
                id="categoryName"
                onChange={changedata}
                name="categoryName"
              />
            </div>
            <div className="form-col">
              <label htmlFor="currency" className="mandatory-label">
                Currency:
              </label>
              <input
                type="text"
                id="currency"
                onChange={changedata}
                name="currency"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="seminarFee" className="mandatory-label">
                Seminar Fee:
              </label>
              <input
                type="text"
                id="seminarFee"
                name="seminarFee"
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
      {/* <div className="list-tem-main">hi</div> */}
    </div>
  );
};

export default AddCompanyCategory;

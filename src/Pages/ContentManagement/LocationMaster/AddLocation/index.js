import React, { useState } from "react";
import "./styles.css";
import { getNames } from "country-list";
import { baseUrl, token3, tokken3 } from "../../../../Constants/network";
import AddCountry from "../AddCountry";
import AddCity from "../AddCity";
import AddState from "../AddState";
import axios from "axios";

const AddLocation = () => {
  const [Countryst, SetCountry] = useState(false);
  const [Cityst, SetCity] = useState(false);
  const [Statest, SetState] = useState(false);
  const [Location,SetLocation]=useState('')
  console.log(Location);
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
    
    // SetCountry(true);
    // SetCity(true);
    // SetState(true);
    SetLocation(e.target.value)
    // SetLocation('City')
    // SetLocation( value)
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

  // const contrywalafn = () => {
  //   SetCountry(true);
  //   alert("CALL");
  // };
  // const citywalafn = () => {
  //   SetCity(true);
  // };
  // const statewalafn = () => {
  //   SetState(true);
  // };
  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Location Details</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
         
          Location==='Country'? (<AddCountry/>):Location==='City'?(<AddCity/>):Location==='State' ?(<AddState/>)
          
          :(
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
                  <option value="select">Please Select</option>
                  <option value="Country">Country</option>
                  
   
                  <option value="State">State</option>
               
                  <option value="City">City</option>
                  
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
            {/* {Countryst ? (
              <AddCountry />
            ) : ( */}
              <div className="form-row">
                <div className="form-col">
                  <label className="mandatory-label">Country/State:</label>
                  <select
                    name="countryState"
                    id="countryState"
                    value={alldata?.countryState}
                    onChange={changedata}
                  >
                    <option value="6505885d84f707da1a6c0769">
                      Andhra Pradesh
                    </option>
                    <option value="Delhi"> Delhi</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  </select>
                </div>
              </div>
            {/* )} */}
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
             )
             
         
        // city-wala-code

    

        
      )}
    </div>
  );
};

export default AddLocation;

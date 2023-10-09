import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Constants/network"

const Popup = ({ companyData, onClose, Alldelete, companyID }) => {
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    if (companyID) {
      axios
        .get(`${baseUrl}api/v1/Company`)
        .then((response) => {
          setCompanyDetails(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data from API", error);
        });
    }
  }, [companyID]);

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-content">
          <h2 style={{ fontSize: "25px" }}>Company Details</h2>

          <div>
            {companyDetails ? (
              <div> 
                <div>
                <strong>companyCategoryId: - </strong> {companyDetails[6].companyCategoryId}
                </div>
                <div>
                  <strong>companyName: - </strong> {companyDetails[6].companyName}
                </div>
                <div>
                  
                </div>
                <div>
                  <strong>countryId: - </strong> {companyDetails[6].countryId}
                </div>
                <div>
                  <strong>isdCode: - </strong> {companyDetails[6].isdCode}
                </div>
                <div>
                  <strong>pinCode: - </strong> {companyDetails[6].pinCode}
                </div>
                <div>
                  <strong>stateCityId: - </strong> {companyDetails[6].stateCityId}
                </div>
                <div>
                  <strong>address1: - </strong> {companyDetails[6].address1}
                </div>
                <div>
                  <strong>address2: - </strong> {companyDetails[6].address2}
                </div>

                
              </div>
            ) : (
              <p>Loading company details...</p>
            )}
          </div>
        </div>
      </div>
      <button
        style={{
          width: "100px",
          height: "30px",
          background: "black",
          color: "white",
          borderRadius: "10px",
        }}
        className="close-button"
        onClick={onClose}
      >
        Close
      </button>
      <button
        style={{
          width: "100px",
          height: "30px",
          background: "black",
          color: "white",
          borderRadius: "10px",
        }}
        className="close-button"
      >
        Edit
      </button>
      <button
        style={{
          width: "100px",
          height: "30px",
          background: "black",
          color: "white",
          borderRadius: "10px",
        }}
        onClick={() => Alldelete(companyID)}
      >
        Delete
      </button>
    </div>
  );
};

export default Popup;

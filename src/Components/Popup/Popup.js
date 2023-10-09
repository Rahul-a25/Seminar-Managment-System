import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Constants/network"

const Popup = ({ companyData, onClose, Alldelete, companyID }) => {
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    if (companyID) {
      axios
        .get(`${baseUrl}api/v1/company-categories`)
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
                  <strong>ID: - </strong> {companyDetails[33]._id}
                </div>
                <div>
                  <strong>Category Name: - </strong>{" "}
                  {companyDetails[33].categoryName}
                </div>
                <div>
                  <strong>Currency: - </strong> {companyDetails[33].currency}
                </div>
                <div>
                  <strong>Seminar Fee: - </strong> {companyDetails[33].seminarFee}
                </div>
                <div>
                  <strong>Is Published: - </strong>{" "}
                  {companyDetails[0].isPublished ? "Yes" : "No"}
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

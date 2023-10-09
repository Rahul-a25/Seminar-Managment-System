import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Constants/network"

const Popup = ({ companyData, onClose, Alldelete, companyID }) => {
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    if (companyID) {
      axios
        .get(`${baseUrl}api/v1/getAllLocationState/6505879c4d50f7c6053f8efd`)
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
          <h2 style={{ fontSize: "25px" }}>Location: - Country</h2>

          <div>
            {companyDetails ? (
              <div>
                <div>
                  <strong>ID: - </strong> {companyDetails[1]._id}
                </div>
                <div>
                  <strong>locationType: - </strong>{" "}
                  {companyDetails[0].locationName}
                </div>
                <div>
                  <strong>locationName: - </strong> {companyDetails[0].locationType}
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

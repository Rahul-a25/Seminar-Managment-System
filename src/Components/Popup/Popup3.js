import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Constants/network";

const Popup3 = ({ onClose, Alldelete, companyID }) => {
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    if (companyID) {
      axios
        .get(`${baseUrl}api/v1/EventCategory`)
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
                  <strong>createdAt: - </strong> {companyDetails[13].createdAt}
                </div>
                <div>
                  <strong>eventCategoryName: - </strong>{" "}
                  {companyDetails[13].eventCategoryName}
                </div>
                <div>
                  <strong>isPublished: - </strong>{" "}
                  {companyDetails[13].isPublished}
                </div>
                <div>
                  <strong>showInOrder: - </strong>{" "}
                  {companyDetails[13].showInOrder}
                </div>
                <div>
                  <strong>updatedAt: - </strong> {companyDetails[13].updatedAt}
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
        onClick={onClose}>
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
        className="close-button">
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
        onClick={() => Alldelete(companyID)}>
        Delete
      </button>
    </div>
  );
};

export default Popup3;

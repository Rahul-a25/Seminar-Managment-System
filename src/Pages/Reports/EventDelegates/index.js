import React, { useState } from "react";
import styles from "./styles.module.css";
import { getNames } from "country-list";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTable, usePagination } from "react-table";


// Sample data
const data = [
  {
    id: 1,
  },
  
  
  
  
  // Add more data here
];

//columns
const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Registration No", accessor: "registrationNo" },
  { Header: "Delegate Name", accessor: "delegateName" },  
  { Header: "Designation", accessor: "designation" },  
  { Header: "Email Id", accessor: "emailId" },  
  { Header: "Contact No", accessor: "contactNo" },  
  { Header: "Category", accessor: "category" },  
  { Header: "Company Name", accessor: "companyName" },  
  { Header: "Company Group", accessor: "companyGroup" },  
  { Header: "Company code", accessor: "companyCode" },  
  { Header: "Company Address1", accessor: "companyAddress1" },  
  { Header: "Company Address2", accessor: "companyAddress2" },  
  { Header: "Company Location", accessor: "companyLocation" },  
  { Header: "Company Country", accessor: "companyCountry" },  
  { Header: "Company Name on Batch", accessor: "companyNameonBatch" },  
  { Header: "Payment", accessor: "payment" },  
  { Header: "Attended", accessor: "attended" },  
  { Header: "Receipt No", accessor: "receiptNo" },  
  { Header: "Sponsorer", accessor: "sponsorer" },  
  { Header: "Address 1", accessor: "address1" },  
  { Header: "Address 2", accessor: "address2" },  
  { Header: "Delegate Location", accessor: "delegateLocation" },  
  { Header: "Delegate Country", accessor: "delegateCountry" },  
  { Header: "Show Contact No", accessor: "showContactNo" },  
  { Header: "Show Email", accessor: "showEmail" },  
  { Header: "Open for Appointment", accessor: "openforAppointment" },  
  { Header: "Is Published", accessor: "isPublished" },  
];






const EventDelegates = () => {
  const countryNames = getNames();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTableExpanded, setIsTableExpanded] = useState(true);
 
  const exportToExcel = () => {
    const wsData = data.map((item) => ({
      ID: item.id,
      "Registration No": item.registrationNo,
  "Delegate Name": item.delegateName,  
  "Designation": item.designation,  
  "Email Id": item.emailId,  
 "Contact No": item.contactNo,  
  "Category": item.category,  
  "Company Name": item.companyName,  
  "Company Group": item.companyGroup,  
  "Company code": item.companyCode,  
  "Company Address1": item.companyAddress1,  
  "Company Address2": item.companyAddress2,  
  "Company Location": item.companyLocation,  
  "Company Country": item.companyCountry,  
  "Company Name on Batch": item.companyNameonBatch,  
  "Payment": item.payment,  
  "Attended": item.attended,  
 "Receipt No": item.receiptNo,  
  "Sponsorer": item.sponsorer,  
  "Address 1": item.address1,  
  "Address 2": item.address2,  
  "Delegate Location": item.delegateLocation,  
  "Delegate Country": item.delegateCountry,  
  "Show Contact No": item.showContactNo,  
  "Show Email": item.showEmail,  
  "Open for Appointment": item.openforAppointment,  
  "Is Published": item.isPublished,
    }));


    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "file");

    // Generate the Excel file as an ArrayBuffer
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Convert the ArrayBuffer to a Blob
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a temporary URL to the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.xlsx";
    a.click();

    // Release the temporary URL and clean up
    window.URL.revokeObjectURL(url);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  const toggleTableExpand = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );
  return (
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Search</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
        <form className="form-container">
          <div className="form-row">
            <div className="form-col">
              <label className="mandatory-label">Event : </label>
              <select required>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label>Category :</label>
              <select >
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
          <div className="form-col">
              <label >Company :</label>
              <select >
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label>Payment Status :</label>
              <select >
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
          </div>
          <div className="form-row">
          <div className="form-col">
              <label htmlFor="countryName">Country :</label>
              <select
                id="countryName"
              >
                <option value="">Select a country</option>
                {countryNames.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-col">
              <label htmlFor="countryName">Location :</label>
              <select
                id="countryName"
              >
                <option value="">Select</option>
                {countryNames.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          
          <div className="form-row">
            <div className="form-col">
              <label >Registration No :</label>
              <input type="text" />
            </div>
            <div className="form-col">
              <label>Delegate Name :</label>
              <input type="text" />
            </div>
          </div>         
          
          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">View</button>
            </div>
          </div>
        </form>
      )}

      {/* table */}
      <div className={`yourComponent ${isTableExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Search Result</div>
        <button className="expandButton" onClick={toggleTableExpand}>
          {isTableExpanded ? "-" : "+"}
        </button>
      </div>
      {isTableExpanded && (
        <div className="container mx-auto mt-5">
           <div
              className="form-row"
              style={{
                backgroundColor: "rgb(229 231 235)",
                padding: "5px",
                height: " 36px",
              }}
            >
              <button
                className="btn"
                onClick={exportToExcel}
                style={{ backgroundColor: "#fff", borderRadius: "8px" }}
              >
                Export To Excel
              </button>
            </div>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="table-auto w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-gray-200"
                    style={{ fontSize: "14px" }}
                  >
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="py-2 px-4">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="border px-4 py-2"
                            style={{ fontSize: "12px" }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap justify-between">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="responsive-button"
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="responsive-button"
            >
              {"<"}
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="responsive-button"
            >
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="responsive-button"
            >
              {">>"}
            </button>
            <span className="mt-1">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="p-2 border rounded responsive-select"
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default EventDelegates;

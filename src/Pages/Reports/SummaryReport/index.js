import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTable, usePagination } from "react-table";

// Sample data
const data = [
  
  {
    id: 1,
    registraionNo: "Speaker",
    event: "INR",
    delegateCategory: 45,
    delegateLoginId: "true",
    delegateTitle: "true",
    firstName: "true",
    middleName: "true",
    lastName: "true",
    emailId: "true",
    alternateEmailId: "true",
    password: "true",
    mobileNo: "true",
    designation: "true",
    companyName: "true",
    address1: "true",
    address2: "true",
    city: "true",
    state: "true",
    country: "true",
    pinCode: "true",
    aboutDelegate: "true",
    payment: "true",
    receiptNo: "true",
    showEmail: "true",
    showContactNo: "true",
    openForAppointment: "true",
    attendence: "true",
    isActive: "true",
    showInOrder: "true",
  },  
  // Add more data here
];

//columns
const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Event", accessor: "event" },
  { Header: "Category", accessor: "category" },
  { Header: "Total", accessor: "total" },
  { Header: "Attended", accessor: "attended" },
  { Header: "Payable", accessor: "payable" },
  { Header: "Non Payable", accessor: "nonPayable" },
  { Header: "No of Payment Recieved", accessor: "noofPaymentRecieved" },
  { Header: "No of Payment Pending", accessor: "noofPaymentPending" },
  { Header: "Recieved Amount in Usd", accessor: "recievedAmountinUsd" },
  { Header: "Pending Amount in Usd", accessor: "pendingAmountinUsd" },
  { Header: "Recieved Amount in Rs", accessor: "recievedAmountinRs" },
  { Header: "Pending Amount in Rs", accessor: "pendingAmountinRs" },
  
];

const handleAction = (id) => {
  console.log(`Clicked action for ID ${id}`);
};

const SummaryReport = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const exportToExcel = () => {
    const wsData = data.map((item) => ({
      ID: item.id,
  "Event": item.event,
  "Category": item.category,
  "Total": item.total,
  "Attended": item.attended,
  "Payable": item.payable,
  "Non Payable": item.nonPayable,
  "No of Payment Recieved": item.noofPaymentRecieved,
  "No of Payment Pending": item.noofPaymentPending,
  "Recieved Amount in Usd": item.recievedAmountinUsd,
  "Pending Amount in Usd": item.pendingAmountinUsd,
  "Recieved Amount in Rs": item.recievedAmountinRs,
  "Pending Amount in Rs": item.pendingAmountinRs,
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
    <>
    <div className="yourComponent expanded">
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Search</div>
        </div>
        <form className="form-container">
          
          <div className="form-row">            
            <div className="form-col">
              <label>Event : </label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>          
          </div>
          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">View</button>
            </div>
          </div> 
          </form>
      
      </div>
    <div className={`yourComponent ${isExpanded ? "expanded" : ""}`}>
      <div className="horizontalLine"></div>
      <div className="header">
        <div className="title">Search Result</div>
        <button className="expandButton" onClick={toggleExpand}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
      {isExpanded && (
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
    </>
  );
};

export default SummaryReport;

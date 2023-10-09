import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTable, usePagination } from "react-table";

// Sample data
const data = [
  {
    id: 1,
    event: "Speaker",
    sponsorName: "INR",
    sponsorType: 45,
    shortName: "true",
    sponsorId: "true",
    sponsorLabel: "true",
    sponsorDescription: "true",
    sponsorCity: "true",
    sponsorAddress: "true",
    pinCode: "true",
    sponsorFromDate: "true",
    sponserToDate: "true",
    sponsorWebUrl: "true",
    contactPerson: "true",
    contactPersonNo: "true",
    geoLat: "true",
    geolong: "true",
    isPublished: "true",
    showInOrder: "true",
  },
  // Add more data here
];

//columns
const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Event", accessor: "event" },
  { Header: "Sponsor Name", accessor: "sponsorName" },
  { Header: "Sponsor Type", accessor: "sponsorType" },
  { Header: "Short Name", accessor: "shortName" },
  { Header: "Sponsor Id", accessor: "sponsorId" },
  { Header: "Sponsor Label", accessor: "sponsorLabel" },
  { Header: "Sponsor Description", accessor: "sponsorDescription" },
  { Header: "Sponsor City", accessor: "sponsorCity" },
  { Header: "Sponsor Address", accessor: "sponsorAddress" },
  { Header: "Pin Code", accessor: "pinCode" },
  { Header: "Sponsor From Date", accessor: "sponsorFromDate" },
  { Header: "Sponser To date", accessor: "sponserToDate" },
  { Header: "Sponsor Web Url", accessor: "sponsorWebUrl" },
  { Header: "Contact Person", accessor: "contactPerson" },
  { Header: "Contact Person No", accessor: "contactPersonNo" },
  { Header: "Geo Lat", accessor: "geoLat" },
  { Header: "Geo long", accessor: "geolong" },
  { Header: "Is Published", accessor: "isPublished" },
  { Header: "Show In Order", accessor: "showInOrder" },
  {
    Header: "Action",
    accessor: "actions",
    Cell: ({ row }) => (
      <button
        onClick={() => handleAction(row.original.id)}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        View
      </button>
    ),
  },
];

const handleAction = (id) => {
  console.log(`Clicked action for ID ${id}`);
};

const ListOfSponsors = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const exportToExcel = () => {
    const wsData = data.map((item) => ({
      ID: item.id,
      Event: item.event,
      "Sponsor Name": item.sponsorName,
      "Sponsor Type": item.sponsorType,
      "Short Name": item.shortName,
      "Sponsor Id": item.sponsorId,
      "Sponsor Label": item.sponsorLabel,
      "Sponsor Description": item.sponsorDescription,
      "Sponsor City": item.sponsorCity,
      "Sponsor Address": item.sponsorAddress,
      "Pin Code": item.pinCode,
      "Sponsor From Date": item.sponsorFromDate,
      "Sponser To date": item.sponserToDate,
      "Sponsor Web Url": item.sponsorWebUrl,
      "Contact Person": item.contactPerson,
      "Contact Person No": item.contactPersonNo,
      "Geo Lat": item.geoLat,
      "Geo long": item.geolong,
      "Is Published": item.isPublished,
      "Show In Order": item.showInOrder,
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
              <label>Event Name : </label>
              <select>
                <option value="">--select--</option>
                <option value="category 1">category 1</option>
                <option value="category 2">category 2</option>
                <option value="category 3">category 3</option>
              </select>
            </div>
            <div className="form-col">
              <label>Sponsor Name :</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <button type="submit" className="btn">
                View
              </button>
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

export default ListOfSponsors;

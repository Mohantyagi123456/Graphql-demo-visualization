import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const tableHead = {
  name: "Country Name",
  code: "Country Code",
};

const UserTable = ({ allData }) => {
  const countPerPage = 10;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );
  const [sortField, setSortField] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null); 


  const filterData = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = cloneDeep(
      allData.filter((item) => item.name.toLowerCase().includes(lowerCaseQuery))
    );
    return filteredData;
  };

  useEffect(() => {
    if (!value) {
      setCurrentPage(1);
      setCollection(cloneDeep(allData.slice(0, countPerPage)));
    } else {
      const filteredData = filterData(value);
      setCurrentPage(1);
      setCollection(cloneDeep(filteredData.slice(0, countPerPage)));
    }
  }, [value, allData]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setIsAscending(!isAscending);
    } else {
      setSortField(field);
      setIsAscending(true);
    }
    const sortedData = cloneDeep(collection).sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      return isAscending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    setCollection(sortedData);
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return (
        <td key={i} onClick={() => handleRowClick(key)} className="clickable-row">
          {key[keyD]}
        </td>
      );
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.entries(tableHead).map(([field, title], index) => (
      <td key={index} onClick={() => handleSort(field)} className="sortable">
        {title}{" "}
        {sortField === field &&
          (isAscending ? <span>&uarr;</span> : <span>&darr;</span>)}
      </td>
    ));
  };

  const summaryRow = () => {
    if (selectedRow) {
      return (
        <tr>
          <td colSpan={Object.keys(tableHead).length}>
            Summary: {selectedRow.name}, {selectedRow.code}
          </td>
        </tr>
      );
    }
    return null; 
  };

  return (
    <>
      <div className="search">
        <input
          placeholder="Search Country"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <table>
        <tbody>{summaryRow()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={allData.length}
      />
    </>
  );
};

export default UserTable;

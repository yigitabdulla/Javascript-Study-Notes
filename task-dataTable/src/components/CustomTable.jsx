import React, { useEffect, useState } from 'react';
import dummyData from '../data/data.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styles/customTable.css"
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { MenuItem, Select } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function CustomTable() {
  const [dynamicColumns, setDynamicColumns] = useState(Object.keys(dummyData[0] || {}));
  const [originalData] = useState(dummyData);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [columnWidths, setColumnWidths] = useState(dynamicColumns.map(() => 150));
  const [visibleColumns, setVisibleColumns] = useState(dynamicColumns.map(() => true));
  const [search, setSearch] = useState({});
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isResizing, setIsResizing] = useState(false);
  const [draggedColIndex, setDraggedColIndex] = useState(null);

  const handleSearch = (column, value) => {
    setSearch(prev => ({ ...prev, [column]: value }));
  };

  useEffect(() => {

    //column specific filtering
    let filtered = originalData.filter(item =>
      dynamicColumns.every(col =>
        String(item[col]).toLowerCase().includes((search[col] || '').toLowerCase())
      )
    );

    //global filtering
    if (globalSearch.trim()) {
      filtered = filtered.filter(item =>
        dynamicColumns.some(col =>
          String(item[col]).toLowerCase().includes(globalSearch.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to page 1 on new search
  }, [search, globalSearch, originalData]);

  const handleSort = (column) => {
    setSelectedColumn(column);
    setIsSortVisible(!isSortVisible);
  };


  //sorting data
  const sortData = (column, direction) => {
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];
      if (typeof aVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });

    setFilteredData(sorted);
    setIsSortVisible(false);
    setSelectedColumn('');
  };


  //changing column visibility
  const toggleColumnVisibility = (index) => {
    const updated = [...visibleColumns];
    updated[index] = !updated[index];
    setVisibleColumns(updated);
  };

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  //console.log(indexOfLastRow)
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  //console.log(indexOfFirstRow)
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  //console.log(currentRows)
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  //console.log(totalPages)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDragStart = (index) => {
    //console.log(index)
    setDraggedColIndex(index);
  };
  
  const handleDrop = (index) => {
    // If no column is dragged or dropped onto itself, do nothing
    if (draggedColIndex === null || draggedColIndex === index) return;
  
    // Make copies of the current dynamicColumns, visibleColumns, and columnWidths arrays
    const newDynamicColumns = [...dynamicColumns];
    const newVisibleColumns = [...visibleColumns];
    const newColumnWidths = [...columnWidths];
  
    // Remove the dragged column's data (column name, visibility, width) from its original position
    const movedColumn = newDynamicColumns.splice(draggedColIndex, 1)[0];
    const movedVisibility = newVisibleColumns.splice(draggedColIndex, 1)[0];
    const movedWidth = newColumnWidths.splice(draggedColIndex, 1)[0];
  
    // Insert the dragged column's data into the new position
    newDynamicColumns.splice(index, 0, movedColumn);
    newVisibleColumns.splice(index, 0, movedVisibility);
    newColumnWidths.splice(index, 0, movedWidth);
  
    // Clear the dragged column index after drop is done
    setDraggedColIndex(null);
  
    // Update the states with the new order
    setDynamicColumns(newDynamicColumns);
    setVisibleColumns(newVisibleColumns);
    setColumnWidths(newColumnWidths);
  };
  
  

  return (
    <div className="table-wrapper">
      <h1>User Table</h1>

      <div className="table-top">
        <input
          className="global-search"
          type="text"
          placeholder="Search..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />

        <div className="column-selector">
          <button className="selector-button" onClick={() => setShowColumnSelector(!showColumnSelector)}>
            Select Columns
          </button>
          {showColumnSelector && (
            <div className="dropdown">
              {dynamicColumns.map((col, idx) => (
                <label key={col} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={visibleColumns[idx]}
                    onChange={() => toggleColumnVisibility(idx)}
                  />
                  {col}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="table-container">
        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 450 }} aria-label="custom table">
            <TableHead>
              <TableRow>
                {dynamicColumns.map((column, idx) =>
                  visibleColumns[idx] && (
                    <TableCell
                      key={column}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(idx)}
                      style={{ padding: 0, height: '80px' }}
                    >

                      <ResizableBox
                        width={columnWidths[idx]}
                        height={60}
                        axis="x"
                        resizeHandles={['e']}
                        onResizeStart={() => setIsResizing(true)}
                        onResizeStop={(e, { size }) => {
                          const updated = [...columnWidths];
                          updated[idx] = size.width;
                          setColumnWidths(updated);
                          setIsResizing(false)
                        }}
                        minConstraints={[50, 60]}
                        maxConstraints={[600, 60]}
                      >
                        <div className="column-header">
                          <div>
                            <strong>{column[0].toUpperCase() + column.slice(1)}</strong>
                            <span
                              onClick={() => handleSort(column)}
                              className="sort-icon"
                            >
                              ↕
                            </span>
                            {isSortVisible && selectedColumn === column && (
                              <div className="sort-options">
                                <span onClick={() => sortData(column, 'asc')}>Asc▲</span>
                                <span onClick={() => sortData(column, 'dsc')}>Dsc▼</span>
                              </div>
                            )}
                          </div>
                          <input
                            type="text"
                            placeholder={`Search ${column}`}
                            value={search[column] || ''}
                            onChange={(e) => handleSearch(column, e.target.value)}
                            className="search-input"
                          />
                        </div>
                      </ResizableBox>
                    </TableCell>
                  )
                )}
                <TableCell><div className="column-header"><strong>Actions</strong></div></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentRows.map((row) => (
                <TableRow key={row.id}>
                  {dynamicColumns.map((col, idx) =>
                    visibleColumns[idx] && (
                      <TableCell align='left' key={col} style={{ width: columnWidths[idx] }}>
                        {row[col]}
                      </TableCell>
                    )
                  )}
                  <TableCell align='left'>
                    <EditOutlinedIcon style={{ cursor: 'pointer' }} />
                    <DeleteOutlinedIcon style={{ cursor: 'pointer' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <div className="rows-per-page">
          <label htmlFor="rows-per-page-select">Rows per page: </label>
          <Select
            id="rows-per-page-select"
            value={rowsPerPage}
            onChange={(e) => {
              setCurrentPage(1); // reset to page 1
              setRowsPerPage(e.target.value);
            }}
            className="select-box"
            size="small"
          >
            {[5, 10, 15, 20].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>



    </div>
  );
}

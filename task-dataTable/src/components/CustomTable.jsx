import React, { useState } from 'react'
import dummyData from '../data/data.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function CustomTable() {

    const dynamicColumns = Object.keys(dummyData[0] || {});
    const [columnWidths, setColumnWidths] = useState(dynamicColumns.map(column => 100))
    const [visibleColumns, setVisibleColumns] = useState(dynamicColumns.map(column => true))
    const [data, setData] = useState(dummyData);
    const [selectedColumn, setSelectedColumn] = useState('')
    const [isSortVisible, setIsSortVisible] = useState(false)

    const handleSort = (columnName) => {
          setSelectedColumn(columnName)
          setIsSortVisible(true)
          
    };

    const sortData = (columnName,key) => {
        let sortedData
      
        switch (key) {
            case 'asc':
              sortedData = [...data].sort((a, b) => {
                if (typeof a[columnName] === "string") {
                  return a[columnName].localeCompare(b[columnName]);
                } else {
                  return a[columnName] - b[columnName];
                }
              });
              break;
          
            case 'dsc':
              sortedData = [...data].sort((a, b) => {
                if (typeof a[columnName] === "string") {
                  return b[columnName].localeCompare(a[columnName]);
                } else {
                  return b[columnName] - a[columnName];
                }
              });
              break;
          
            default:
              return;
          }
          setData(sortedData);
          setIsSortVisible(false)
          setSelectedColumn('')
    }

    const toggleColumnVisibility = (index) => {
        const updatedVisibility = [...visibleColumns];
        updatedVisibility[index] = !updatedVisibility[index];
        setVisibleColumns(updatedVisibility);
      };
      
    

    return (
        <div>
            <h1>User Table</h1>

            <div className="table-container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                               {dynamicColumns.map((column,idx) => 
                                <TableCell width={columnWidths[idx]} key={column}>
                                    <div>
                                        {column[0].toUpperCase() + column.slice(1)}
                                        <div onClick={() => handleSort(column)}>
                                            X
                                        </div>
                                        {isSortVisible && <div>
                                            <span onClick={() => sortData(selectedColumn,'asc')}>Ascending</span>
                                            <span onClick={() => sortData(selectedColumn,'dsc')}>Descending</span>
                                        </div>}
                                    </div>
                                    <input type="text" placeholder={"Search " + column}/>
                                </TableCell>
                                )}
                               <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row,idx) => (
                                visibleColumns[idx] && <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.age}</TableCell>
                                <TableCell align="left">{row.role}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>


    )
}

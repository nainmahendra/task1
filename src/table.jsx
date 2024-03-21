import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(title, subcategory, price, popularity) {
  return { title, subcategory, price, popularity};
}


export default function BasicTable() {

    const [rows , setRows] = useState([]); 

    useEffect(() => {
        var obj = []; 
      
        fetch('https://s3.amazonaws.com/open-to-cors/assignment.json')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
        
            Object.entries(data['products']).forEach((entry) => {
                // console.log(entry[1])
              let val = createData(entry[1]["title"], entry[1]["subcategory"], entry[1]["price"], entry[1]["popularity"]); 
              console.log(val); 
              obj.push(val); 
            });
            
            obj.sort((a, b) => a.price - b.price);
      
            // Call setRows here after processing the data
            setRows(obj); 
          });
      }, []);
      

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title </TableCell>
            <TableCell align="right">Subcatogery</TableCell>
            <TableCell align="right">Price </TableCell>
            <TableCell align="right">Popularity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.subcategory}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.popularity}</TableCell>
   
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
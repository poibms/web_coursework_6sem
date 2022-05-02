import { React, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { Image } from 'react-bootstrap';
import { getCollections, deleteCollection } from '../../services/collectionService';
import { MdDelete } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminCollList = observer(() => {

  const { collection } = useContext(Context)

  useEffect(() => {
    getCollections().then((data) => collection.setCollections(data));
  }, [collection])

  const deleteCol = (id) => {
    deleteCollection(id)
    .then(collection.setCollections(collection.collections.filter((i) => i.id != id)));
  }

  return (
    <TableContainer className='mt-5 mb-5' component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Description(g)</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Owner's email</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collection.collections.map((coll) => (
            <StyledTableRow key={coll.id}>
              <StyledTableCell component="th" scope="row">
                {coll.title}
              </StyledTableCell>
              <StyledTableCell align="right">{coll.description}</StyledTableCell>
              <StyledTableCell align="right">
                <Image
                  width={50}
                  height={50}
                  src={process.env.REACT_APP_API_URL + '/' + coll.image}
                />
              </StyledTableCell>
              <StyledTableCell align="right">{coll.email}</StyledTableCell>
              <StyledTableCell align="right">
                
                <MdDelete className='icons' onClick={() => deleteCol(coll.id)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
})
export default AdminCollList;


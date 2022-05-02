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
import { getAllUsers, limitUser } from '../../services/userServices';
import { FaBan } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";

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

const AdminListUsers = observer(() => {

  const { user } = useContext(Context)

  useEffect(() => {
    getAllUsers().then((data) => user.setUsers(data));
  }, [user])

  console.log(user)

  const statusHandler = (id) => {
    limitUser(id)
    .then((data) => updateUser(data) );
  }

  const updateUser = (data) => {
    user.setUser(user.allUsers.map((i) => {
      if(i.id == data.id) {
        i.status = data.status
      }
    }))
    console.log(user.allUsers[1])
    
  }

  return (
    <TableContainer className='mt-5 mb-5' component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.allUsers.map((i) => (
            <StyledTableRow key={i.id}>
              <StyledTableCell component="th" scope="row">
                {i.email}
              </StyledTableCell>
              <StyledTableCell align="right">{i.role}</StyledTableCell>
              <StyledTableCell align="right">{i.status}</StyledTableCell>
              <StyledTableCell align="right">
                {i.status == 'ACTIVE' ? (
                  <FaBan className='icons' onClick={() => statusHandler(i.id)} />
                ) : (
                  <BsCheckCircle className='icons' onClick={() => statusHandler(i.id)} />
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
})
export default AdminListUsers;


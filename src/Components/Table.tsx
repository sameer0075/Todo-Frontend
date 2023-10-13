import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { todoLabels } from '../Labels/todo.labels';
import { TodoInterface } from '../Interfaces/todo.interface';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { DeleteTodo } from '../redux/Slices/todo.slice';
import { useDispatch } from 'react-redux';
interface DataInterface{
    data: TodoInterface[]
    handleOpen:()=>void
    SetSelected:any
}

export default function CustomTable({data,handleOpen,SetSelected}:DataInterface) {
  const dispatch: any = useDispatch();

  const handleDialog = (todo:any) => {
    SetSelected(todo)
    handleOpen()
  }

  const handleDelete = (todo:any) => {
    dispatch(DeleteTodo(todo))
    SetSelected(null)
  }

  return (
    <div style={{display:'flex',justifyContent:'center',marginTop:30}}>
        <Paper sx={{ width: 1000 }}>
            <Button onClick={handleOpen} sx={{float:'right',margin:5}} variant="contained">Add a Todo</Button>

        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {todoLabels.map((column,index) => (
                    <TableCell
                    key={index}
                    align='left'
                    style={{ minWidth: 170 }}
                    >
                    {column}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => {
                    return (
                    <React.Fragment>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {
                            Object.keys(row).map((key) => {
                                const obj = row as any
                                return (
                                    <TableCell align='left'>
                                    {key == 'action' ? 
                                    <div>
                                        <EditIcon onClick={() => handleDialog(row)} sx={{marginRight:2,cursor:'pointer'}}/>
                                        <DeleteIcon onClick={() => handleDelete(row)} sx={{cursor:'pointer'}}/> 
                                    </div>
                                    : obj[key]}
                                    </TableCell>
                                ); 
                            })
                        }
                    </TableRow>
                    </React.Fragment>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    </div>
  );
}
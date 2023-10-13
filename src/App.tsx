import React, { useEffect, useState } from 'react';
import './App.css';
import CustomTable from './Components/Table';
import FormDialog from './Components/Dialog';
import CustomForm from './Components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllTodo } from './redux/Slices/todo.slice';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [open, setOpen] = useState(false)
  const [selected,setSelected] = useState(null)
  const dispatch: any = useDispatch();
  const data = useSelector((state:any) => state);
  const handleDialog = () => {
    setOpen(!open)
  }

  useEffect(()=>{
    dispatch(GetAllTodo())
  },[])

  return (
    <div className="App">
      <ToastContainer />
        <CustomTable handleOpen={handleDialog} data={data.todos.todos} SetSelected={setSelected} />
        <FormDialog open={open}
          heading='Todo Application'
          description='Here is the Todo App'
          handleClose={handleDialog}
          handleOpen={handleDialog} >
            <CustomForm handleDialog={handleDialog} selected={selected} />
          </FormDialog>
    </div>
  );
}

export default App;

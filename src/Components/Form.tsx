import React from 'react'
import { TodoSchema } from '../Schema/schema'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useDispatch } from 'react-redux';
import { AddNewTodo, GetAllTodo, UpdateTodo } from '../redux/Slices/todo.slice';


export default function CustomForm({selected,handleDialog}: any) {
    const dispatch: any = useDispatch();
    const handleSubmit = (values:any) => {
        if(selected) {
            Object.assign(values,{_id:selected._id})
            dispatch(UpdateTodo(values)).then((response:any)=>{
                if(response.payload.todo) {
                    dispatch(GetAllTodo())
                }
            })
        } else {
            dispatch(AddNewTodo(values))
        }
        handleDialog()
    }
    return (
        <Formik
            initialValues={{
                title: selected?.title || "",
                description: selected?.description || "",
                status: selected?.status || "",
            }}
            validationSchema={TodoSchema}
            onSubmit={handleSubmit}
        >
            <Form>
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
          />
          <ErrorMessage name="title" render={(msg) => (
                <span style={{color:'red'}}>{msg}</span>
            )} />

          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="status">Status</InputLabel>
            <Field as={Select} label="Status" name="status" id="status">
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Field>
            <ErrorMessage name="status" render={(msg) => (
                <span style={{color:'red'}}>{msg}</span>
            )} />
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
        </Formik>
    )
}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../url";
import { TODO_ENDPOINTS } from "../Endpoints";
import axios from "axios";

interface TodoResponseInterface {
    _id: string;
    title: string;
    description:string;
    status:string;
}

interface TodoPayload {
    _id?:string
    title:string
    status:string
    description?:string
}
const initialState = {
	isLoading: <boolean>false,
	todos: <TodoResponseInterface[]>[]
};

export const AddNewTodo = createAsyncThunk(
	"todo/create",
	async (data: TodoPayload, thunkAPI) => {
		try {
			const resp:any = await axios.post<TodoResponseInterface>(`${url}${TODO_ENDPOINTS.CREATE_TODO}`, data);
			return resp.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const GetAllTodo = createAsyncThunk(
	"todo/get-all",
	async (data, thunkAPI) => {
		try {
			const resp:any = await axios.get(
				`${url}${TODO_ENDPOINTS.GET_ALL_TODOS}`,
			);
			return resp.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const UpdateTodo = createAsyncThunk(
	"todo/update-todo",
	async (data: TodoPayload, thunkAPI) => {
		try {
			const resp:any = await axios.put<TodoResponseInterface>(
				`${url}${TODO_ENDPOINTS.GET_TODO}/${data._id}`,
				data
			);
			return resp.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const DeleteTodo = createAsyncThunk(
	"todo/delete-todo",
	async (data:any, thunkAPI) => {
		try {
			const resp:any = await axios.delete<TodoResponseInterface>(
				`${url}${TODO_ENDPOINTS.GET_TODO}/${data._id}`,
			);
			return resp.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(GetAllTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(GetAllTodo.fulfilled, (state, action) => {
                action.payload.data.forEach((element:any) => {
                    Object.assign(element,{action:true})
                });
				state.isLoading = false;
				state.todos = action.payload.data;
			})
			.addCase(GetAllTodo.rejected, (state, action: any) => {
				const message: any = action.error.message
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})
			.addCase(AddNewTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(AddNewTodo.fulfilled, (state, action) => {
				state.isLoading = false;
                Object.assign(action.payload.data,{action:true})
				state.todos = [...state.todos,action.payload.data];
				toast.info("Data Created Successfully")
			})
			.addCase(AddNewTodo.rejected, (state, action: any) => {
				const message: any = action.payload.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})
			.addCase(UpdateTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(UpdateTodo.fulfilled, (state, action) => {
				state.isLoading = false;
                toast.info("Data updated successfully");
			})
			.addCase(UpdateTodo.rejected, (state, action: any) => {
				const message: any = action.error.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})

			.addCase(DeleteTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(DeleteTodo.fulfilled, (state, action) => {
				state.isLoading = false;
                state.todos = state.todos.filter((info) => info._id !== action.payload.data._id);
				toast.info("Data deleted successfully");
			})
			.addCase(DeleteTodo.rejected, (state, action: any) => {
				const message: any = action.payload.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})
	},
});

export default todoSlice.reducer;
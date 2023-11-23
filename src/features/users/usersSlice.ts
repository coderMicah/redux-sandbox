import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store/store";

interface User{
    id:string;
    name:string;
}

const URL = "https://jsonplaceholder.typicode.com/users";
export const fetchUsers = createAsyncThunk("users/fetchUsres", async () => {
    try {
        const response = await axios.get(URL);
        return [...response.data]
    } catch (err:unknown) {
        return err.message
    }
})

const initialState:User[] = []


//static state
// const initialState:User[] = [
//     { id: '0', name: 'Tianna Jenkins' },
//     { id: '1', name: 'Kevin Grant' },
//     { id: '2', name: 'Madison Price' }
//   ]

const usersReducer = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers(builder) {
            builder
             .addCase(fetchUsers.fulfilled, (state, action) => {
                 return action.payload
             })
            
         
    },
})

export const selectAllUser = (state:RootState) => state.users
export default usersReducer.reducer
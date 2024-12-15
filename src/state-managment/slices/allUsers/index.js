import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../core/utils/constants";


const initialState = {
    loading: false,
    users: [],
    error: null
}


export const fetchAllUsers = createAsyncThunk('data/fetchAllUsers', async () => {
    const queryData = await getDocs(collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS))
    const resultData = queryData.docs.map((doc) => {
        return doc.data()
    })

    return resultData
})

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {},
    extraReducers: (promise) => {
        promise
        .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
            state.users = []
        })
    }
})


export default allUsersSlice.reducer
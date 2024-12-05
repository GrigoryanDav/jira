import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from '../../../services/firebase'
import { getDocs, collection } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from '../../../core/utils/constants'

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}


export const fetchIssuesData = createAsyncThunk('data/fetchData', async () => {
    const queryData = await getDocs(collection(db, FIRESTORE_PATH_NAMES.ISSUES))

    return queryData.docs.map((doc) => {
        return doc.data()
    })
})


const issueSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {},
    extraReducers: (promise) => {
        promise
        .addCase(fetchIssuesData.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchIssuesData.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        .addCase(fetchIssuesData.rejected, (state, action) => {
            state.isLoading = false
            state.data = []
            state.error = action.payload
        })
    }
})

export default issueSlice.reducer
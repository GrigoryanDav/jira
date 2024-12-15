import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from '../../../services/firebase'
import { getDocs, collection } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from '../../../core/utils/constants'
import { transformIssueData } from '../../../core/helpers/transformIssueData'

const initialState = {
    data: {},
    isLoading: false,
    error: null,
}


export const fetchIssuesData = createAsyncThunk('data/fetchData', async () => {
    const queryData = await getDocs(collection(db, FIRESTORE_PATH_NAMES.ISSUES))

    const resultData = queryData.docs.map((doc) => {
        return doc.data()
    })

    return transformIssueData(resultData)
})


const issueSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        changeIssueColumns: (state, action) => {
            const columns = state.data
            const { destination, source } = action.payload
            const sourceColumnItems = [...columns[source.droppableId]]
            const destinationColumnItems = [...columns[destination.droppableId]]
            const [removedItem] = sourceColumnItems.splice(source.index, 1)
            destinationColumnItems.splice(destination.index, 0, removedItem)

            let changeColumns = {}
            if (source.droppableId !== destination.droppableId) {
                changeColumns = {
                    ...columns,
                    [source.droppableId]: sourceColumnItems,
                    [destination.droppableId]: destinationColumnItems,
                }
            } else {
                sourceColumnItems.splice(destination.index, 0, removedItem)
                changeColumns = {
                    ...columns,
                    [source.droppableId]: sourceColumnItems
                }
            }

            state.data = changeColumns
        }
    },
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

export const { changeIssueColumns } = issueSlice.actions
export default issueSlice.reducer
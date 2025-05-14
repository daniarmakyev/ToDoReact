import { createSlice } from "@reduxjs/toolkit"

const INIT = {}

const taskSlice = createSlice({
    initialState:INIT,
    name:"task",
    reducers:{},
    extraReducers:(builder) => {
        // builder
    }
})

export default taskSlice
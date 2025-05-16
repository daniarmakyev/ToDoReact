import { createSlice } from "@reduxjs/toolkit";
import { getTaskList } from "../action/task.action";

export interface ITask {
    id: string;
    title: string;
    description: string;
    status: "In Progress" | "Done" | string;
    date: string;
}

interface TaskState {
    task: ITask;
    tasks: ITask[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    task: {
        id: "",
        title: "",
        description: "",
        status: "",
        date: "",
    },
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTaskList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTaskList.fulfilled, (state, { payload }) => {
                state.tasks = payload;
                state.loading = false;
            })
            .addCase(getTaskList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tasks";
            })
    },
});

export default taskSlice;
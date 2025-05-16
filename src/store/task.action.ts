import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import type { ITask } from "./task.slice";


export const getTaskList = createAsyncThunk(
    "task/getTaskList",
    async () => {
        try {
            const response = await axios.get<ITask[]>("http://localhost:8000/tasks");
            const data = response.data;
            return data
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }
);

export const taskStatusChange = createAsyncThunk(
    "task/taskStatusChange",
    async (
        { taskId, checked }: { taskId: string; checked: boolean },
        thunkAPI
    ) => {
        try {
            await axios.patch(`http://localhost:8000/tasks/${taskId}`, {
                status: checked ? "Done" : "In Progress",
            });
            thunkAPI.dispatch(getTaskList());
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }
);
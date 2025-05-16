import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import type { ITask } from "../slice/task.slice";

export const taskStatusChange = createAsyncThunk(
    "task/taskStatusChange",
    async ({ taskId, checked }: { taskId: string; checked: boolean }) => {
        try {
            await axios.patch(`http://localhost:3002/tasks/${taskId}`, {
                status: checked ? "Done" : "In Progress",
            });
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }
);

export const getTaskList = createAsyncThunk(
    "task/getTaskList",
    async () => {
        try {
            const response = await axios.get<ITask[]>("http://localhost:3002/tasks");
            const data = response.data;
            return data
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }
);

export const createTask = createAsyncThunk(
    "task/createTask",
    async (data: ITask) => {
        try {
            await axios.post<ITask[]>("http://localhost:3002/tasks", data);
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }
);
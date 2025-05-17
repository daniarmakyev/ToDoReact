import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ITask } from "../slice/task.slice";

export const taskStatusChange = createAsyncThunk(
    "task/taskStatusChange",
    async ({ taskId, status }: { taskId: string; status: string }) => {
        try {
            await axios.patch(`http://localhost:3002/tasks/${taskId}`, {
                status: status,
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
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw error;
        }
    }
);

export const createTask = createAsyncThunk(
    "task/createTask",
    async (data: ITask) => {
        try {
            await axios.post("http://localhost:3002/tasks", data);
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    }
);

export const editTask = createAsyncThunk(
    "task/editTask",
    async ({ id, updatedTask }: { id: string; updatedTask: Partial<ITask> }) => {
        try {
            await axios.patch(`http://localhost:3002/tasks/${id}`, updatedTask);
        } catch (error) {
            console.error("Error editing task:", error);
            throw error;
        }
    }
);


export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (taskId: string) => {
        try {
            await axios.delete(`http://localhost:3002/tasks/${taskId}`);
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    }
);

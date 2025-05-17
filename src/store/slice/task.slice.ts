import { createSlice } from "@reduxjs/toolkit";
import { getTaskList, getTaskListByFilter } from "../action/task.action";

export interface ITask {
  id?: string;
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
  notification: {
    show: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info" | "loading";
  }
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
  notification: {
    show: false,
    message: "",
    type: "info"
  }
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    hideNotification: (state) => {
      state.notification.show = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notification = {
          show: true,
          message: "Loading tasks...",
          type: "loading"
        };
      })
      .addCase(getTaskList.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.loading = false;
        state.notification = {
          show: true,
          message: "Tasks loaded successfully",
          type: "success"
        };
      })
      .addCase(getTaskList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
        state.notification = {
          show: true,
          message: `Error: ${action.error.message || "Failed to fetch tasks"}`,
          type: "error"
        };
      })
      .addCase(getTaskListByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notification = {
          show: true,
          message: "Filtering tasks...",
          type: "loading"
        };
      })
      .addCase(getTaskListByFilter.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.loading = false;
        state.notification = {
          show: true,
          message: "Tasks loaded successfully",
          type: "success"
        };
      })
      .addCase(getTaskListByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to filter tasks";
        state.notification = {
          show: true,
          message: `Error: ${action.error.message || "Failed to filter tasks"}`,
          type: "error"
        };
      });
  },
});

export const { hideNotification } = taskSlice.actions;
export default taskSlice;
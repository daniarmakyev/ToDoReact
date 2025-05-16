import { useState, useEffect } from "react";
import InputSearch from "./kit/components/InputSearch";
import Select from "./kit/components/Select";
import ChangeTheme from "./kit/components/ChangeThemeButton";
import AddTask from "./kit/components/AddTaskButton";
import TaskItem from "./kit/components/TaskItem";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  getTaskList,
  taskStatusChange,
  deleteTask,
} from "./store/action/task.action"; // Added missing import
import TaskModal from "./kit/components/TaskModal";
import type { ITask } from "./store/slice/task.slice";

const filterSelectList = ["All", "In Progress", "Done"];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode")
      ? JSON.parse(localStorage.getItem("darkMode")!)
      : false;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState(filterSelectList[0]);
  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteTask(taskId));
    }
  };

  function checkBoxHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
    checked: boolean
  ) {
    e.stopPropagation();
    dispatch(taskStatusChange({ taskId: taskId, checked: !checked }));
  }

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="bg-primary-bg min-h-screen flex flex-col items-center relative px-2 text-black">
      <div className="max-w-[750px] w-full">
        <h1 className="mb-4 text-white-black text-2xl md:mt-10 mt-5 font-medium">
          TODO LIST
        </h1>
        <div className="flex gap-4 w-full">
          <InputSearch
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Select
            list={filterSelectList}
            thumb={filterStatus}
            onChange={setFilterStatus}
          />
          <ChangeTheme
            theme={darkMode}
            onClick={() => setDarkMode((prev: boolean) => !prev)}
          />
        </div>
        <ul className="mt-5 flex flex-col">
          {tasks.length === 0 ? (
            <li className="text-center py-4 text-gray-500">
              No tasks available
            </li>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                cheked={task.status === "Done"}
                checkBoxOnClick={(e) =>
                  checkBoxHandler(e, task.id!, task.status === "Done")
                }
                openModal={(mode) => {
                  setCurrentTask(task);
                  setModalMode(mode);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </ul>
        <AddTask
          onClick={() => {
            setModalMode("create");
            setCurrentTask(null);
            setIsModalOpen(true);
          }}
          className="fixed bottom-8 right-8"
        />

        {isModalOpen && (
          <TaskModal
            mode={modalMode}
            task={currentTask}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;

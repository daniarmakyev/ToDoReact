import { useState, useEffect } from "react";
import InputSearch from "./kit/components/InputSearch";
import Select from "./kit/components/Select";
import ChangeTheme from "./kit/components/ChangeThemeButton";
import AddTask from "./kit/components/AddTaskButton";
import TaskItem from "./kit/components/TaskItem";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getTaskList, taskStatusChange } from "./store/action/task.action";
import TaskModal from "./kit/components/TaskModal";

const filterSelectList = ["All", "In Progress", "Done"];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);

  function checkBoxHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
    checked: boolean
  ) {
    e.preventDefault();
    dispatch(taskStatusChange({ taskId: taskId, checked: !checked }));
  }

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="bg-primary-bg h-screen flex flex-col items-center relative px-2 text-black">
      <div className="max-w-[750px] w-full">
        <h1 className="mb-4 text-white-black text-2xl md:mt-10 mt-5 font-medium">
          TODO LIST
        </h1>
        <div className="flex gap-4 w-full">
          <InputSearch />
          <Select list={filterSelectList} thumb={filterSelectList[0]} />
          <ChangeTheme
            theme={darkMode}
            onClick={() => setDarkMode((prev: boolean) => !prev)}
          />
        </div>
        <ul className="mt-5 flex flex-col gap-4">
          {tasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              cheked={task.status === "Done"}
              checkBoxOnClick={(e) =>
                checkBoxHandler(e, task.id, task.status === "Done")
              }
            />
          ))}
        </ul>
        <AddTask
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-8 right-[10vw]"
        />
        {isModalOpen && (
          <TaskModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
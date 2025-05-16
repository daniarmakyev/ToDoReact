import { useState, useEffect } from "react";
import InputSearch from "./kit/components/InputSearch";
import Select from "./kit/components/Select";
import ChangeTheme from "./kit/components/ChangeThemeButton";
import AddTask from "./kit/components/AddTaskButton";
import TaskItem from "./kit/components/TaskItem";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getTaskList, taskStatusChange } from "./store/task.action";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-primary-bg h-screen flex flex-col items-center relative px-2 text-black">
      <div className="max-w-[750px] w-full">
        <h1 className="mb-4 text-white-black text-2xl md:mt-10 mt-5 font-medium">
          TODO LIST
        </h1>
        <div className="flex gap-4 w-full">
          <InputSearch />
          <Select list={["lol", "lol", "lol", "lol"]} thumb="all" />
          <ChangeTheme
            theme={darkMode}
            onClick={() => setDarkMode((prev) => !prev)}
          />
        </div>
        <ul className="mt-5 flex flex-col gap-4">
          {tasks &&
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onChange={(checked) =>
                  dispatch(
                    taskStatusChange({
                      taskId: task.id,
                      checked: checked,
                    })
                  )
                }
              />
            ))}
        </ul>
        <AddTask
          onClick={() => console.log("clicked")}
          className={"absolute bottom-8 right-[10vw]"}
        />
      </div>
    </div>
  );
}

export default App;

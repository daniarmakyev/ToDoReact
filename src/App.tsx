import { useState, useEffect } from "react";
import InputSearch from "./kit/components/InputSearch";
import Select from "./kit/components/Select";
import ChangeTheme from "./kit/components/ChangeThemeButton";
import AddTask from "./kit/components/AddTaskButton";
import TaskItem from "./kit/components/TaskItem";
import detective from "/detective.png";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getTaskListByFilter } from "./store/action/task.action"; // Added missing import
import TaskModal from "./kit/components/TaskModal";
import { hideNotification, type ITask } from "./store/slice/task.slice";
import Notify from "./kit/components/Notify";

const filterSelectList = ["All", "In Progress", "Done"];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState(filterSelectList[0]);
  const { tasks, notification, loading } = useAppSelector(
    (state) => state.task
  );
  const dispatch = useAppDispatch();
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getTaskListByFilter({
          searchValue: searchValue,
          status: filterStatus,
        })
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, filterStatus]);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <div className="bg-primary-bg min-h-screen flex flex-col items-center relative px-2 text-black">
      <div className="max-w-[750px] w-full relative">
        {notification.show && (
          <Notify
            type={notification.type}
            message={notification.message}
            onClose={handleCloseNotification}
          />
        )}
        <h1 className="mb-4 text-white-black text-2xl md:mt-10 mt-5 font-medium w-fit sm:mx-auto">
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
          <ChangeTheme />
        </div>
        <ul className="mt-5 flex flex-col items-center">
          {loading ? (
            <div className="w-16 h-16 border-4 border-t-transparent border-white-black border-solid rounded-full animate-spin mt-10"></div>
          ) : tasks.length === 0 ? (
            <li className="mx-auto">
              <img
                src={detective}
                alt="empty image"
                className="max-w-[225px] max-h-[171px]"
              />
              <h2 className="text-center text-white-black text-lg md:text-xl">
                Empty...
              </h2>
            </li>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                openModal={(mode) => {
                  setCurrentTask(task);
                  setModalMode(mode);
                  setIsModalOpen(true);
                }}
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

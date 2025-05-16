import type { ITask } from "../../store/slice/task.slice";
import CheckBox from "./ChekBox";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const TaskItem = ({
  task,
  cheked,
  checkBoxOnClick,
  openModal,
  onDelete,
}: {
  task: ITask;
  cheked: boolean;
  checkBoxOnClick: React.MouseEventHandler<HTMLButtonElement>;
  openModal: (mode: "edit" | "view") => void;
  onDelete: (taskId: string) => void; 
}) => {
  return (
    <li
      className="flex justify-between items-center border-b-purple border-b-[1px] pb-3 pt-3 hover:bg-task-hover cursor-pointer p-1"
      onClick={() => {
        openModal("view");
      }}
    >
      <div className="flex items-center gap-3">
        <CheckBox checked={cheked} checkBoxOnClick={checkBoxOnClick} />
        <div>
          <h5
            className={`text-xs sm:text-lg m-0 text-white-black w-[45vw] max-w-[100vw] sm:w-auto sm:max-w-[350px] md:max-w-[450px] truncate whitespace-nowrap overflow-hidden ${
              cheked ? "line-through mask-linear-to-inherit" : ""
            }`}
          >
            {task.title}
          </h5>
          <p
            className={`text-xs md:text-sm font-normal text-[#a9a9a9] w-[35vw] max-w-[100vw] sm:w-auto sm:max-w-[350px] md:max-w-[450px] truncate whitespace-nowrap overflow-hidden ${
              cheked ? "line-through" : ""
            }`}
          >
            {task.description}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <span
          className={`text-xs md:text-sm text-white-black ${
            cheked ? "line-through mask-linear-to-inherit" : ""
          }`}
        >
          {new Date(task.date).toLocaleDateString("ru-RU")}
        </span>
        <EditButton
          onClick={(e) => {
            e.stopPropagation(); 
            openModal("edit");
          }}
        />
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation(); 
            if (task.id) {
              onDelete(task.id);
            }
          }}
        />
      </div>
    </li>
  );
};

export default TaskItem;

import type { ITask } from "../../store/slice/task.slice";
import CheckBox from "./ChekBox";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const TaskItem = ({
  task,
  cheked,
  checkBoxOnClick,
}: {
  task: ITask;
  cheked: boolean;
  checkBoxOnClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <li className="flex justify-between items-center border-b-purple border-b-[1px] pb-2">
      <div className="flex items-center gap-3">
        <CheckBox checked={cheked} checkBoxOnClick={checkBoxOnClick} />
        <div>
          <h5
            className={`text-xl m-0 text-white-black ${
              cheked ? "line-through" : ""
            }`}
          >
            {task.title}
          </h5>
          <p
            className={`text-sm font-normal text-[#a9a9a9] ${
              cheked ? "line-through" : ""
            }`}
          >
            {task.description}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <EditButton onClick={() => {}} />
        <DeleteButton onClick={() => {}} />
      </div>
    </li>
  );
};

export default TaskItem;

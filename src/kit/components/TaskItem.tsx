import type { ITask } from "../../store/task.slice";
import CheckBox from "./ChekBox";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const TaskItem = ({
  task,
  onChange,
}: {
  task: ITask;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <li className="flex justify-between items-center border-b-purple border-b-[1px] pb-2">
      <div className="flex items-center gap-3">
        <CheckBox checked={task.status === "Done"} onChange={onChange} />
        <div>
          <h5
            className={`text-xl m-0 text-white-black ${
              task.status === "Done" ? "line-through" : ""
            }`}
          >
            {task.title}
          </h5>
          <p
            className={`text-sm font-normal text-[#a9a9a9] ${
              task.status === "Done" ? "line-through" : ""
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

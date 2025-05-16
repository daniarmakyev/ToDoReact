import React, { useState, useEffect } from "react";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { useAppDispatch } from "../../hooks/hooks";
import { createTask, editTask } from "../../store/action/task.action";
import type { ITask } from "../../store/slice/task.slice";

const TaskModal = ({
  onClose,
  mode,
  task,
}: {
  onClose: () => void;
  mode: "create" | "edit" | "view";
  task?: ITask | null;
}) => {
  const dispatch = useAppDispatch();
  const isEdit = mode === "edit";
  const isView = mode === "view";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        date: task.date.toString().slice(0, 10),
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isView) return;

    if (!formData.title.trim() || !formData.date) {
      alert("Please fill all fileds");
      return;
    }

    if (isEdit && task?.id) {
      dispatch(
        editTask({
          id: task.id,
          updatedTask: {
            title: formData.title.trim(),
            description: formData.description.trim(),
            date: new Date(formData.date).toISOString(),
            status: task.status,
          },
        })
      );
    } else {
      dispatch(
        createTask({
          title: formData.title.trim(),
          description: formData.description.trim(),
          status: "In Progress",
          date: new Date(formData.date).toISOString(),
        })
      );
    }

    setFormData({ title: "", description: "", date: "" });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2.5"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-[500px] bg-primary-bg rounded-xl p-6 shadow-lg">
        <h3 className="text-lg md:text-2xl text-center text-white-black uppercase">
          {isEdit ? "edit note" : isView ? "view note" : "new note"}
        </h3>

        <form className="flex flex-col gap-y-2 mt-2.5" onSubmit={handleSubmit}>
          <Input
            name="title"
            placeholder="Input your note..."
            onChange={handleChange}
            value={formData.title}
            readOnly={isView}
          />
          <Input
            name="description"
            className="min-h-28"
            placeholder="Input your note description..."
            isTextarea
            onChange={handleChange}
            value={formData.description}
            readOnly={isView}
          />
          <Input
            name="date"
            type="date"
            onChange={handleChange}
            value={formData.date}
            readOnly={isView}
          />
          <div className="flex justify-between items-center mt-2">
            <PrimaryButton
              outline
              onClick={() => {
                onClose();
              }}
            >
              cancel
            </PrimaryButton>
            {!isView && (
              <PrimaryButton type="submit">
                {isEdit ? "update" : "apply"}
              </PrimaryButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

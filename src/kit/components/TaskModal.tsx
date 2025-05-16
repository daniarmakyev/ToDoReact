import React from "react";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";

interface TaskModalProps {
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose }) => {
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
          new note
        </h3>
        <form
          className="flex flex-col gap-y-2 mt-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <Input placeholder="Input your note..." />
          <Input
            className="min-h-28"
            placeholder="Input your note description..."
            isTextarea
          />
          <Input type="date" />
          <div className="flex justify-between items-center mt-2">
            <PrimaryButton outline onClick={onClose}>
              cancel
            </PrimaryButton>
            <PrimaryButton type="submit">apply</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
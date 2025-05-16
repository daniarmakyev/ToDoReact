import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  isTextarea?: boolean;
}

const Input = ({
  type = "text",
  placeholder,
  onChange,
  className,
  isTextarea = false,
}: InputProps) => {
  const baseClass =
    "placeholder:text-input-placeholder w-full bg-primary-bg rounded-sm text-primary border px-4 py-2 border-primary-border focus:outline-2 outline-primary-outline";

  if (isTextarea) {
    return (
      <textarea
        className={className + " " + baseClass}
        placeholder={placeholder}
        onChange={onChange}
        rows={4}
      />
    );
  }

  return (
    <input
      className={className + " " + baseClass + " max-h-9 min-h-10"}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;

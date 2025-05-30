import React from "react";

const PrimaryButton = ({
  outline = false,
  children,
  onClick,
  type = "button",
}: {
  outline?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  const baseStyles =
    "uppercase max-w-[100px] px-5 py-2 rounded-md transition-all duration-300 active:border-primary-border";

  return outline ? (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} bg-transparent hover:bg-purple hover:border-transparent hover:text-white text-purple border border-purple`}
    >
      {children}
    </button>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} bg-purple hover:bg-transparent hover:text-purple hover:border-purple border border-transparent text-white`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

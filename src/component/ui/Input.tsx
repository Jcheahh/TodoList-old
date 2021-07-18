import React from "react";

type InputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "className"
> & {
  className?: string[];
};

const InputClasses = [
  "w-full",
  "p-3",
  "font-thin",
  "transition",
  "duration-200",
  "focus:shadow-md",
  "focus:outline-none",
  "ring-offset-2",
  "border",
  "border-gray-400",
  "rounded-lg",
  "focus:ring-2",
  "focus:ring-purple-300",
];

function Input({ className = [], ...props }: InputProps): JSX.Element {
  return (
    <input className={[...InputClasses, ...className].join(" ")} {...props} />
  );
}

export default Input;

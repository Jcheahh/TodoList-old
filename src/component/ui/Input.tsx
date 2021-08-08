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
  "focus:shadow-sm",
  "focus:outline-none",
  "ring-offset-0",
  "border",
  "border-gray-400",
  "rounded-lg",
  "focus:ring-2",
];

function Input({ className = [], ...props }: InputProps): JSX.Element {
  return (
    <input className={[...InputClasses, ...className].join(" ")} {...props} />
  );
}

export default Input;

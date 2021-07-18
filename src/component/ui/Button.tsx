import React from "react";
import { toText, gray5 } from "./color";
import "./Button.css";

function toLarge(classes: string[]) {
  return [...classes, "py-4", "px-10", "text-xl"];
}

function toSmall(classes: string[]) {
  return [...classes, "py-1.5", "px-4"];
}

const buttonBaseClasses = [
  "ui-button", // For own custom css
  "rounded-xl",
  "tracking-wide",
  "font-semibold",
  "font-display",
  "focus:outline-none",
  "focus:shadow-outline",
  "disabled:opacity-50",
  "transform",
  "hover:shadow",
];

const buttonClasses = [...buttonBaseClasses, toText(gray5)];

type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "className"
> & {
  children: string;
  className?: string[];
  isLarge?: boolean;
};

export function Button({
  children,
  type = "button",
  className = [],
  isLarge = false,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={[
        "ui-main-button",
        ...(isLarge ? toLarge(buttonClasses) : toSmall(buttonClasses)),
        ...className,
      ].join(" ")}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

import React from "react";
import { Link as RLink, LinkProps } from "react-router-dom";
import { red1, red2, toText } from "./color";

const baseClasses = ["leading-normal", toText(red1), `hover:text-${red2}`];

type RLinkProps = Omit<
  React.PropsWithoutRef<LinkProps> & React.RefAttributes<HTMLAnchorElement>,
  "className"
> & {
  children: string;
  className?: string[];
};

export function Link({
  children,
  className = [],
  ...props
}: RLinkProps): JSX.Element {
  return (
    <RLink className={[...baseClasses, ...className].join(" ")} {...props}>
      {children}
    </RLink>
  );
}

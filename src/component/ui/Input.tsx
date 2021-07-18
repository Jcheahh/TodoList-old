import React from "react";

function Input({ className = [], ...props }: {
    className: string[],
}): JSX.Element {
    return (
        <input className={[...className].join(" ")} {...props} />
    );
}

export default Input;

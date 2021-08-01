import React, { ReactNode, useState } from "react";

function Dropdown({ children }: { children?: ReactNode }): JSX.Element {
  const [click, setClick] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setClick(!click)}
          className="ml-72 inline-flex justify-center py-2 text-sm font-medium text-gray-700 focus:outline-none"
        >
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>
      </div>
      {click && children}
    </div>
  );
}

export default Dropdown;

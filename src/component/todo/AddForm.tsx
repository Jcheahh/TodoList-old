import React, { ChangeEvent, useLayoutEffect, useRef, useState } from "react";

function AddForm(props: { addTodo: (todo: string) => void }): JSX.Element {
  const [todo, setTodo] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    props.addTodo(todo);

    setTodo("");
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current!.focus();
  });

  return (
    <>
      <input
        name="task"
        className="bg-gray-100 border-gray-100 flex-1 focus-within:border-current focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 px-6 py-6 my-6 mr-1.5 h-10 rounded-2xl text-gray-900"
        value={todo}
        placeholder="Add something"
        onChange={handleChange}
        ref={inputRef}
        autoComplete="off"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-purple-100 focus:outline-none text-sm py-2.5 px-8 rounded-2xl font-bold hover:bg-purple-600 hover:text-purple-100 text-purple-700 transform self-center text-lg"
      >
        Add
      </button>
    </>
  );
}

export default AddForm;

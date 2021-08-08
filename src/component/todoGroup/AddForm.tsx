import React, { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import Input from "../ui/Input";

function AddForm(props: {
  addTodoGroup: (todoGroup: string) => void;
}): JSX.Element {
  const [todoGroup, setTodoGroup] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoGroup(e.target.value);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    props.addTodoGroup(todoGroup);

    setTodoGroup("");
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current!.focus();
  });

  return (
    <div className="flex">
      <input
        name="task"
        className="bg-gray-100 border-gray-100 placeholder-gray-600 p-6 my-6 mr-1.5 h-10 text-gray-900 w-full transition duration-200 focus:shadow-sm focus:outline-none ring-offset-0 border border-gray-400 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-gray-100"
        type="text"
        value={todoGroup}
        placeholder="Add list"
        onChange={handleChange}
        ref={inputRef}
        autoComplete="off"
      />
      <Button
        type="button"
        onClick={handleSubmit}
        className={[
          "focus:outline-none text-sm py-2.5 px-8 rounded-2xl font-boldtransform self-center text-lg",
        ]}
      >
        Add
      </Button>
    </div>
  );
}

export default AddForm;

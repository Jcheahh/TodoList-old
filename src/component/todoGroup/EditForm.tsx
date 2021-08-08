import React, { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

function EditForm(props: {
  defaultValue: string;
  editTodoGroup: (todoGroup: string) => void;
}): JSX.Element {
  const [todoGroup, setTodoGroup] = useState(props.defaultValue || "");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoGroup(e.target.value);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    props.editTodoGroup(todoGroup);

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
        value={todoGroup}
        placeholder="Update your list"
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
        Save
      </Button>
    </div>
  );
}

export default EditForm;

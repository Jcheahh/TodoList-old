import React, { ReactElement, useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import http from "../http";
import AddForm from "./todoGroup/AddForm";
import EditForm from "./todoGroup/EditForm";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import { Text } from "./ui/Text";

interface TodoGroupField {
  id: number;
  title: string;
}

function TodoGroup(): ReactElement {
  const [todoGroups, setTodoGroups] = useState<TodoGroupField[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    http.get("/todo_group").then((body) => {
      setTodoGroups(body.data);
    });
  }, []);

  const addTodoGroup = (title: string) => {
    if (!title) {
      return;
    }
    http
      .post<TodoGroupField>("/todo_group", {
        title,
      })
      .then((response) => {
        const newTodo = [...todoGroups, response.data];
        setTodoGroups(newTodo);
      })
      .catch((err) => {
        <Prompt message={err} />;
      });
  };

  const editTodoGroup = (todoGroup: TodoGroupField) => {
    const { id, title } = todoGroup;

    if (!title) {
      return;
    }
    http
      .put(`/todo_group/${id}`, {
        title,
      })
      .then((_) => {
        const edit = todoGroups.map((item) =>
          item.id === id ? todoGroup : item,
        );
        setTodoGroups(edit);
        setEditingId(null);
      })
      .catch((err) => {
        <Prompt message={err} />;
      });
  };

  const removeTodoGroup = (id: number) => {
    http.delete(`/todo_group/${id}`).then((_) => {
      const removeArr = [...todoGroups].filter(
        (todo_group) => todo_group.id !== id,
      );

      setTodoGroups(removeArr);
    });
  };

  return (
    <div className="App shadow font-sans px-9 py-16 flex justify-start flex-col w-4/6 max-w-screen-sm bg-white mx-auto my-28 rounded-2xl">
      <Text.H2 className={["font-bold"]}>Lists</Text.H2>
      <AddForm addTodoGroup={addTodoGroup} />
      {todoGroups.map((todoGroup) => {
        if (editingId === todoGroup.id) {
          return (
            <EditForm
              defaultValue={todoGroup.title}
              editTodoGroup={(title) => {
                editTodoGroup({
                  ...todoGroup,
                  title,
                });
              }}
            />
          );
        }
        return (
          <div className="my-2 px-5 border inline-flex items-center bg-white leading-none p-2 text-sm">
            <Link
              to={`/todo_group/${todoGroup.id}`}
              className={["text-md flex-1 ml-4"]}
            >
              {todoGroup.title}
            </Link>
            <Button type="button" onClick={() => setEditingId(todoGroup.id)}>
              Edit
            </Button>
            <Button type="button" onClick={() => removeTodoGroup(todoGroup.id)}>
              <svg
                width="14"
                height="14"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path d="M12 12h2v12h-2z" fill="currentColor" />
                <path d="M18 12h2v12h-2z" fill="currentColor" />
                <path
                  d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z"
                  fill="currentColor"
                />
                <path d="M12 2h8v2h-8z" fill="currentColor" />
              </svg>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default TodoGroup;

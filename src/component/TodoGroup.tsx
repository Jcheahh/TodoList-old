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
      <Text.H2 className={["font-bold"]}>Todo Group</Text.H2>
      <div className="my-2 px-5 border inline-flex items-center bg-white leading-none rounded-full p-2 shadow text-sm">
        <AddForm addTodoGroup={addTodoGroup} />
      </div>
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
          <div className="my-2 px-5 border inline-flex items-center bg-white leading-none rounded-full p-2 shadow text-sm">
            <Link to={`/todo_group/${todoGroup.id}`}>{todoGroup.title}</Link>
            <Button type="button" onClick={() => setEditingId(todoGroup.id)}>
              Edit
            </Button>
            <Button type="button" onClick={() => removeTodoGroup(todoGroup.id)}>
              Remove
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default TodoGroup;

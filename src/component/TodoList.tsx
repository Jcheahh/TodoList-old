import React, { useEffect, useState } from "react";
import { Prompt, useParams } from "react-router-dom";
import Todo, { TodoField } from "./Todo";
import http from "../http";
import { Text } from "./ui/Text";
import { Link } from "./ui/Link";
import AddForm from "./todo/AddForm";
import EditForm from "./todo/EditForm";

const TodoList = (): JSX.Element => {
  const [todosTitle, setTodosTitle] = useState<string>();
  const [todos, setTodos] = useState<TodoField[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { todo_group_id } = useParams<{ todo_group_id: string }>();

  useEffect(() => {
    http.get(`/todo_group/${todo_group_id}`).then((body) => {
      setTodos(body.data.todos);
      setTodosTitle(body.data.title);
    });
  }, []);

  const addTodo = (task: string) => {
    if (!task) {
      return;
    }
    http
      .post<TodoField>(`/todo_group/${todo_group_id}/todos`, {
        task,
        is_done: 0,
      })
      .then((response) => {
        const newTodo = [...todos, response.data];
        setTodos(newTodo);
      })
      .catch((err) => {
        <Prompt message={err} />;
      });
  };

  const completeTodo = (todo: TodoField) => {
    http
      .put(`/todo_group/${todo_group_id}/todos/${todo.id}`, {
        task: todo.task,
        is_done: !todo.is_done,
      })
      .then((_) => {
        const updateTodo = todos.map((item) => {
          const is_done = item.id === todo.id ? !item.is_done : item.is_done;

          return { ...item, is_done };
        });
        setTodos(updateTodo);
      });
  };

  const editTodo = (todo: TodoField) => {
    const { id, task, is_done } = todo;

    if (!task) {
      return;
    }
    http
      .put(`/todo_group/${todo_group_id}/todos/${id}`, {
        task,
        is_done,
      })
      .then((_) => {
        const edit = todos.map((item) => (item.id === id ? todo : item));
        setTodos(edit);
        setEditingId(null);
      })
      .catch((err) => {
        <Prompt message={err} />;
      });
  };

  const removeTodo = (id: number) => {
    http.delete(`/todo_group/${todo_group_id}/todos/${id}`).then((_) => {
      const removeArr = [...todos].filter((todo) => todo.id !== id);

      setTodos(removeArr);
    });
  };

  return (
    <div className="App shadow font-sans px-9 py-12 flex justify-start flex-col w-4/6 max-w-screen-sm bg-white mx-auto my-28 rounded-2xl">
      <div className="flex justify-between items-center">
        <Text.H2 className={["font-bold"]}>{todosTitle}</Text.H2>
        <Link to="/">Back</Link>
      </div>
      <AddForm addTodo={addTodo} />
      {todos.map((todo) => {
        if (editingId === todo.id) {
          return (
            <EditForm
              key={editingId}
              defaultValue={todo.task}
              editTodo={(task) => {
                editTodo({
                  ...todo,
                  task,
                });
              }}
            />
          );
        }
        return (
          <Todo
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            setEditingId={setEditingId}
            removeTodo={removeTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;

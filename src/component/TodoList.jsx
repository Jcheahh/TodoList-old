import React, { useEffect, useState } from "react";
import axios from "axios";
import { Prompt } from "react-router-dom";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });

    useEffect(() => {
        axios.get("http://localhost:4567/todos")
            .then((body) => {
                setTodos(body.data);
            });
    }, []);

    const addTodo = (task) => {
        if (!task) {
            return;
        }
        axios.post("http://localhost:4567/todos", {
            task,
            is_done: 0,
        }).then((response) => {
            const newTodo = [...todos, response.data];
            setTodos(newTodo);
        }).catch((err) => {
            <Prompt message={err} />;
        });
    };

    const completeTodo = (todo) => {
        axios.put(`http://localhost:4567/todos/${todo.id}`, {
            task: todo.task,
            is_done: !todo.is_done,
        }).then((_) => {
            const updateTodo = todos.map((item) => {
                const is_done = item.id === todo.id ? !item.is_done : item.is_done;

                return { ...item, is_done };
            });
            setTodos(updateTodo);
        });
    };

    const editTodo = (todo) => {
        const { id, task, is_done } = todo;

        if (!task) {
            return;
        }
        axios.put(`http://localhost:4567/todos/${id}`, {
            task,
            is_done,
        }).then((_) => {
            const edit = todos.map((item) => (item.id === id ? todo : item));
            setTodos(edit);
        }).catch((err) => {
            <Prompt message={err} />;
        });

        setEdit({
            id: null,
            value: "",
        });
    };

    const removeTodo = (id) => {
        axios.delete(`http://localhost:4567/todos/${id}`)
            .then((_) => {
                const removeArr = [...todos].filter((todo) => todo.id !== id);

                setTodos(removeArr);
            });
    };

    return (
        <div className="App shadow font-sans px-9 py-16 flex justify-start flex-col w-4/6 max-w-screen-sm bg-white mx-auto my-28 rounded-2xl">
            <h1 className="font-bold text-5xl text-gray-800">Todo List</h1>
            <TodoForm onSubmit={addTodo} />
            {todos.map((todo) => {
                if (edit.id === todo.id) {
                    return (
                        <TodoForm
                            key={edit.id}
                            edit={edit}
                            onSubmit={(task) => {
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
                        setEdit={setEdit}
                        removeTodo={removeTodo}
                    />
                );
            })}
        </div>
    );
};

export default TodoList;

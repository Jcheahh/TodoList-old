import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });


    useEffect(() => {
        axios.get("http://localhost:4567/todos")
            .then(body => {
                setTodos(body.data);
            });

    }, []);


    const addTodo = task => {
        if (!task) {
            return
        }
        axios.post("http://localhost:4567/todos", {
            task,
            is_done: 0
        }).then(response => {
            const newTodo = [...todos, response.data];
            setTodos(newTodo);
        }).catch(err => {
            alert(err);
        })
    }

    const completeTodo = todo => {
        axios.put(`http://localhost:4567/todos/${todo.id}`, {
            task: todo.task,
            is_done: +!todos.is_done,
        }).then(_ => {
            let updateTodo = todos.map(item => {
                if (item.id === todo.id) {
                    item.is_done = !item.is_done;
                }
                return item;

            })
            setTodos(updateTodo);
        })
    }

    const editTodo = (todo) => {
        const { id, task, is_done } = todo;

        if (!task) {
            return
        }
        axios.put(`http://localhost:4567/todos/${id}`, {
            task,
            is_done: +is_done
        }).then(_ => {
            let edit = todos.map(item => (item.id === id ? todo : item));
            setTodos(edit);
        }).catch(err => {
            alert(err);
        })

        setEdit({
            id: null,
            value: ''
        });
    };

    const removeTodo = id => {
        axios.delete(`http://localhost:4567/todos/${id}`)
            .then(_ => {
                const removeArr = [...todos].filter(todo => todo.id !== id);

                setTodos(removeArr);
            });

    };

    return (
        <>
            <h1 className="todo-list">TodoList</h1>
            <TodoForm onSubmit={addTodo} />
            {todos.map(todo => {
                if (edit.id === todo.id) {
                    return <TodoForm key={edit.id} edit={edit} onSubmit={task => {
                        editTodo({
                            ...todo,
                            task,
                        })
                    }} />;
                }
                return <Todo
                    key={todo.id}
                    todo={todo}
                    completeTodo={completeTodo}
                    setEdit={setEdit}
                    removeTodo={removeTodo}
                />
            })}
        </>
    )
}
// const [todos, setTodos] = useState([])

// const addTodo = todo => {
//     if (!todo.task) {
//         return
//     }
//     const newTodo = [todo, ...todos];
//     setTodos(newTodo);
// }

// const completeTodo = id => {
//     let updateTodo = todos.map(todo => {
//         if (todo.id === id) {
//             todo.is_done = !todo.is_done;
//         }
//         return todo;
//     })
//     setTodos(updateTodo);
// }

// const removeTodo = id => {
//     const removeArr = [...todos].filter(todo => todo.id !== id);

//     setTodos(removeArr);
// }

// const response = await axios("http://localhost:4567")
// console.log(response);


// return (
//     <div>
//         <h1 className="todo-list">TodoList</h1>
//         <TodoForm onSubmit={addTodo} />
//         <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
//     </div>
// )     
// }

export default TodoList;
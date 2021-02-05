import React from 'react';

const Todo = ({ todo, completeTodo, removeTodo, setEdit }) => {
  return (
    <div className={todo.is_done ? "todo complete" : "todo"}>
      <input type="checkbox" defaultChecked={todo.is_done} onClick={() => completeTodo(todo)} />
      <div>{todo.task}</div>
      <div>
        <button className="edit" onClick={() => setEdit({ id: todo.id, value: todo.task })}>edit</button>
        <button className="todo-button" onClick={() => removeTodo(todo.id)}>X</button>
      </div>
    </div>
  );
};

export default Todo;
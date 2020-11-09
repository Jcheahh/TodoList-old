import React from 'react';

function Todo({ todos, completeTodo, removeTodo }) {
  return todos.map(todo => (
    <div>
      <div><input type="checkbox" onClick={() => completeTodo(todo.id)} /></div>
      <div>{todo.task}</div>
      <button onClick={() => removeTodo(todo.id)}>X</button>
    </div>
  )
  );}

export default Todo;
import React from 'react';

function Todo({ todos, completeTodo, removeTodo }) {
  return todos.map(todo => (
    <div className={todo.isComplete ? 'todo complete' : 'todo'}>
      <input type="checkbox" onClick={() => completeTodo(todo.id)} />
      <div>{todo.task}</div>
      <button className="todo-button" onClick={() => removeTodo(todo.id)}>X</button>
    </div>
    )
  );
}

export default Todo;
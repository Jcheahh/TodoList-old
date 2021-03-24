import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
    const [todo, setTodo] = useState(props.edit ? props.edit.value : '');

    function handleChange(e) {
      setTodo(e.target.value);
    }

    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    })

    function handleSubmit(e) {
        e.preventDefault();

        props.onSubmit(todo);

        setTodo('');
    }

  return (
      <form onSubmit={handleSubmit}>
        {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={todo}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-form'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Save
          </button>
        </>
      ) : (
        <>
          <input 
            name="task"
            className="todo-form"
            type="text" 
            value={todo}
            placeholder='Add something'
            onChange={handleChange}
            ref={inputRef}
            />
          <button onClick={handleSubmit} className="todo-form-button">Add</button>
          </>
      )}
      </form>
  );
}

export default TodoForm;
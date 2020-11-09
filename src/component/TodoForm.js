import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
    const [todo, setTodo] = useState('');

    function handleChange(e) {
      setTodo(e.target.value);
    }

    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    })

    function handleSumbit(e) {
        e.preventDefault();

        props.onSubmit({
          id: Math.floor(Math.random() * 10000),
          task: todo,
        });

        setTodo('');
    }

  return (
      <form onSubmit={handleSumbit}>
          <input 
            name="task"
            type="text" 
            value={todo}
            placeholder='Add something'
            onChange={handleChange}
            ref={inputRef}
            />
          <button type="submit" >Add</button>
      </form>
  )
}

export default TodoForm;
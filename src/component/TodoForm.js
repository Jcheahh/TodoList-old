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
      <form className="flex" onSubmit={handleSubmit}>
        {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={todo}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            autoComplete="off"
            className='bg-gray-100 border-gray-100 flex-1 focus-within:border-current focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 px-6 py-6 my-6 mr-1.5 h-10 rounded-2xl text-gray-900'
          />
          <button onClick={handleSubmit} className='bg-purple-100 focus:outline-none text-sm py-2.5 px-8 rounded-2xl font-bold hover:bg-purple-600 hover:text-purple-100 text-purple-700 transform self-center text-lg'>
            Save
          </button>
        </>
      ) : (
        <>
          <input 
            name="task"
            className="bg-gray-100 border-gray-100 flex-1 focus-within:border-current focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600 px-6 py-6 my-6 mr-1.5 h-10 rounded-2xl text-gray-900"
            type="text" 
            value={todo}
            placeholder='Add something'
            onChange={handleChange}
            ref={inputRef}
            autoComplete="off"
            />
          <button onClick={handleSubmit} className="bg-purple-100 focus:outline-none text-sm py-2.5 px-8 rounded-2xl font-bold hover:bg-purple-600 hover:text-purple-100 text-purple-700 transform self-center text-lg">Add</button>
          </>
      )}
      </form>
  );
}

export default TodoForm;
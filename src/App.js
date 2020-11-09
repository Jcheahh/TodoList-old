import React, { useState } from 'react';
import './App.css';
import TodoList from './component/TodoList';

function App() {
  const [todo, setTodo] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <TodoList  />
      </header>
    </div>
  );
}

export default App;

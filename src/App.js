import React from 'react';
import './App.css';
import TodoList from './component/TodoList';

function App() {
  return (
    <div className="App shadow font-sans px-9 py-16 flex justify-start flex-col w-4/6 max-w-screen-sm bg-white mx-auto my-28 rounded-2xl">
      <TodoList />
    </div>
  );
}

export default App;

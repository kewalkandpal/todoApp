import './App.css';
import Navbar from './component/Navbar';
import Todo from './component/Todo';
import TodoList from './component/TodoList';

const App = ()=>{
  return (
    <main className='wrapper_div'>
      <h2>React + Typescript Todo App</h2>
      <Navbar />
      <Todo />
      <TodoList />
    </main>
  )
};

export default App;

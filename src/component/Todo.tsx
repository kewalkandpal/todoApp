import { FormEvent, useState } from 'react';
import "./Todo.css";
import { useGlobalContext } from '../context/StateProvider';

function Todo() {
    const { createTodo } = useGlobalContext()
    const [int, setInput] = useState<string>("");

    function handelSubmit(e: FormEvent) {
        e.preventDefault();
        createTodo(int);
        setInput("");
    }
    return (
        <form onSubmit={handelSubmit} className="input_box">
            <input type='text' placeholder='Write your todo...' autoComplete='false' required value={int} onChange={(e) => setInput(e.target.value)} />
            <button className='btn' type='submit'>Add Todo</button>
        </form>
    )
}

export default Todo;
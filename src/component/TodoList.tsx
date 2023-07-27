import "./TodoList.css";
import { useGlobalContext } from '../context/StateProvider';
import {useSearchParams} from "react-router-dom";

function TodoList(){
    const {todo,todoCompleted,deleteItem} = useGlobalContext();
    let filterData = todo;
    const [location] = useSearchParams();
    const path = location.get("todo");

    if(path === "active"){
        filterData = filterData.filter((cur)=> !cur.completed);
    }else if(path === "completed"){
        filterData = filterData.filter((cur)=> cur.completed);
    }
    return(
        <div className="all_todo">
            {
                filterData?.map((cur)=>{
                    return(
                    <div className="todo_list" key={cur.id}>
                        <input type="checkbox" id={`item_${cur.id}`} checked={cur.completed} onChange={()=>todoCompleted(cur.id)}/>
                        <label htmlFor={`item_${cur.id}`} className={cur.completed ? "add_line" : ""}>{cur.task}</label>
                        {
                            cur.completed && <span onClick={()=>deleteItem(cur.id)}>🧯</span>
                        }
                    </div>
                    )
                })
            }
        </div>
    )
}

export default TodoList;
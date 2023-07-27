import {createContext, useContext, useState, useEffect } from "react";

/// interface for children
interface childrenInterface {
    children:React.ReactNode
}

/// interface for todo state
interface todoData {
    id:string
    task:string
    completed:boolean
    createdAt:Date
}

/// interface for createContext
interface contextInterface {
    todo:todoData[]
    createTodo:(task:string)=> void;
    todoCompleted:(id:string)=> void;
    deleteItem:(id:string)=> void;
}

/// create context
const ContextProvider = createContext<contextInterface | null>(null);

function StateProvider({children}:childrenInterface){

  /// todo state
  const [todo,setTodo] = useState<todoData[]>(()=>{
    try{
      const data = localStorage.getItem("todo") || "[]";
      return JSON.parse(data) as todoData[];
    }catch{
      return [];
    }
  })

  /// add new todo
  function createTodo(val:string){
    setTodo([...todo,{
        id:new Date().getTime().toString(),
        task:val,
        completed:false,
        createdAt:new Date()
      }
      ]
    )
  }

  /// add data to local storage
  useEffect(()=>{
    localStorage.setItem("todo",JSON.stringify(todo));
  },[todo])

  /// todo completed
  function todoCompleted(id:string){
   setTodo(prev=>prev.map((cur)=> cur.id === id ? {...cur,completed:!cur.completed} : cur));
  }

  /// deleted todo
  function deleteItem(id:string){
    setTodo(prev=>prev.filter((cur)=>cur.id !== id));
  }

  /// context provider
  return <ContextProvider.Provider value={{todo,createTodo,todoCompleted,deleteItem}}>
    {children}
  </ContextProvider.Provider>
}

/// global context
export const useGlobalContext = ()=>{
  const consumer = useContext(ContextProvider);
  if(!consumer){
    throw new Error("state provider not wrapped")
  }
  return consumer;
}

export default StateProvider;
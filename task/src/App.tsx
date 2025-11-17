
import { useEffect, useState } from "react"

type Priority = "urgente" | "Moyenne" | "Basse"
type Todo = {
  id: number,
  text: string,
  priority: Priority
}
function App() {
   const [input , setInput] = useState<string>('')
   const [priority, setPriority] = useState<Priority>('Moyenne')
   const savedTodos = localStorage.getItem('todos') 
   const initialTodos =  savedTodos? JSON.parse(savedTodos) : []
   const [todos  , setTodos] = useState<Todo[]>(initialTodos)
  useEffect(() =>{
      localStorage.setItem("todos" , JSON.stringify(todos) )
  }, [todos])
   const  addTodo = () => {
      if(input.trim() === "" ) return 
      const newTodo:Todo = {
          id: Date.now(),
          text: input,
          priority: priority
      }
      const newTodos: Todo[] = [newTodo, ...todos]
      setTodos(newTodos)
      setInput("")
      setPriority('Moyenne')
      console.log(newTodos)
   }

  return (
    <>
       <div className="flex justify-center">
          <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 rounded-2xl p-5">
               <div className="flex gap-4">
                 <input 
                    type="text"
                    className="input w-full"
                    placeholder="Ajouter une tache"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                 />
                 <select 
                   className="select w-full"
                   value={priority}
                   onChange={(e) => setPriority(e.target.value as Priority)}
                 >
                     <option value="urgente">urgente</option> 
                     <option value="moyenne">moyenne</option> 
                     <option value="basse">basse</option> 
                 </select>
                 <button 
                    className="btn btn-primary"
                    onClick={addTodo}
                 >
                     Ajouter
                 </button>
               </div>
          </div>.
       </div>
    </>
  )
}

export default App

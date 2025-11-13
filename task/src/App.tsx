
type Priority = "urgente" | "Moyenne" | "Basse"
type todo = {
  id: number,
  text: string,
  priority: Priority
}
function App() {


  return (
    <>
       <div className="flex justify-center">
          <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 rounded-2xl p-5">
               <div className="flex gap-4">
                 <input 
                    type="text"
                    className="input w-full"
                    placeholder="Ajouter une tache"
                 />
                 <select 
                   className="select w-full"
                 >
                     <option value="urgente">urgente</option> 
                     <option value="moyenne">moyenne</option> 
                     <option value="basse">basse</option> 
                 </select>
                 <button className="btn btn-primary">
                     Ajouter
                 </button>
               </div>
          </div>.
       </div>
    </>
  )
}

export default App

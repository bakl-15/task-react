import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Header from "./Components/Header";
import TodoColumn from "./Components/TodoColumn";
import EditModal from "./Components/EditModal";
import type { Todo, Column, Priority } from "./Components/types";

const COLUMNS: Column[] = [
  { key: "urgente", label: "Urgente" },
  { key: "Moyenne", label: "Moyenne" },
  { key: "Basse", label: "Basse" },
];

const TrelloStyleTodos: React.FC = () => {
  const [todos, setTodos] = useState<Record<Priority, Todo[]>>(() => {
    try {
      const raw = localStorage.getItem("tb_board_v1");
      return raw ? JSON.parse(raw) : { urgente: [], Moyenne: [], Basse: [] };
    } catch {
      return { urgente: [], Moyenne: [], Basse: [] };
    }
  });
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const [editing, setEditing] = useState<Todo | null>(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    localStorage.setItem("tb_board_v1", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: input.trim(), priority };
    setTodos(prev => ({ ...prev, [priority]: [newTodo, ...(prev[priority] || [])] }));
    setInput("");
    setPriority("Moyenne");
  };

  const removeTodo = (id: number) => {
    setTodos(prev => {
      const newState = { ...prev };
      for (const key of Object.keys(newState) as Priority[]) {
        newState[key] = newState[key].filter(t => t.id !== id);
      }
      return newState;
    });
  };

  const startEdit = (t: Todo) => setEditing({ ...t });
  const saveEdit = () => {
    if (!editing) return;
    setTodos(prev => {
      const newState = { ...prev };
      for (const key of Object.keys(newState) as Priority[]) {
        newState[key] = newState[key].filter(t => t.id !== editing.id);
      }
      newState[editing.priority] = [editing, ...newState[editing.priority]];
      return newState;
    });
    setEditing(null);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId as Priority;
    const destCol = destination.droppableId as Priority;

    if (sourceCol === destCol) {
      const items = Array.from(todos[sourceCol]);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setTodos(prev => ({ ...prev, [sourceCol]: items }));
    } else {
      const sourceItems = Array.from(todos[sourceCol]);
      const [moved] = sourceItems.splice(source.index, 1);
      const destItems = Array.from(todos[destCol]);
      destItems.splice(destination.index, 0, { ...moved, priority: destCol });
      setTodos(prev => ({ ...prev, [sourceCol]: sourceItems, [destCol]: destItems }));
    }
  };

  const getFilteredTodos = (p: Priority) => {
    const list = todos[p] || [];
    return filterText.trim() ? list.filter(t => t.text.toLowerCase().includes(filterText.toLowerCase())) : list;
  };

  return (
    <div className="min-h-screen bg-[#041026] text-white">
      <Header />

      <main className="max-w-6xl mx-auto p-4">
        {/* Input & Filter */}
        <section className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Nouvelle tâche..."
              className="px-3 py-2 rounded-md bg-[#071428] border border-[#0b4b6b] focus:outline-none"
            />
            <select
              className="px-3 py-2 rounded-md bg-[#071428]"
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
            >
              <option value="urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
            <button className="px-4 py-2 bg-[#00aeef] text-black rounded-md font-semibold" onClick={addTodo}>
              Ajouter
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              placeholder="Rechercher..."
              className="px-3 py-2 rounded-md bg-[#071428] border border-[#0b4b6b] focus:outline-none"
            />
            <button className="px-3 py-2 rounded-md bg-[#083a52]" onClick={() => { setFilterText(""); setInput(""); }}>
              Réinitialiser
            </button>
          </div>
        </section>

        {/* Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLUMNS.map(col => (
              <TodoColumn
                key={col.key}
                column={col}
                todos={getFilteredTodos(col.key)}
                onEdit={startEdit}
                onRemove={removeTodo}
              />
            ))}
          </div>
        </DragDropContext>

        {/* Edit Modal */}
        {editing && (
          <EditModal
            editing={editing}
            onChange={setEditing}
            onCancel={() => setEditing(null)}
            onSave={saveEdit}
          />
        )}
      </main>

      <footer className="text-center text-sm text-slate-400 p-4">
        © {new Date().getFullYear()} eSySolution — Services administratifs & informatiques
      </footer>
    </div>
  );
};

export default TrelloStyleTodos;

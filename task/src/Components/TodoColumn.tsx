import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { Todo, Column } from "./types";
import TodoCard from "./TodoCard";

interface ColumnProps {
  column: Column;
  todos: Todo[];
  onEdit: (t: Todo) => void;
  onRemove: (id: number) => void;
}

const TodoColumn: React.FC<ColumnProps> = ({ column, todos, onEdit, onRemove }) => (
  <Droppable droppableId={column.key}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`rounded-lg p-3 min-h-[300px] ${snapshot.isDraggingOver ? 'bg-[#062437]/60' : 'bg-[#031426]/70'}`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">{column.label}</h2>
          <span className="text-xs text-slate-300">{todos.length}</span>
        </div>

        <div className="space-y-3">
          {todos.map((todo, index) => (
            <TodoCard key={todo.id} todo={todo} index={index} onEdit={onEdit} onRemove={onRemove} />
          ))}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

export default TodoColumn;

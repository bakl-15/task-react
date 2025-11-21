import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Todo } from "./types";

interface TodoCardProps {
  todo: Todo;
  index: number;
  onEdit: (t: Todo) => void;
  onRemove: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, index, onEdit, onRemove }) => (
  <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="p-3 rounded-md bg-gradient-to-r from-[#02283a] to-[#00324a] border border-[#0b5070]"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="font-medium">{todo.text}</div>
            <div className="text-xs text-slate-300 mt-1">Priorité: {todo.priority}</div>
          </div>
          <div className="flex flex-col gap-2 items-end ml-3">
            <button className="text-xs bg-[#072b3a] px-2 py-1 rounded" onClick={() => onEdit(todo)}>Modifier</button>
            <button className="text-xs bg-[#3b0f0f] px-2 py-1 rounded" onClick={() => onRemove(todo.id)}>Supprimer</button>
          </div>
        </div>
      </div>
    )}
  </Draggable>
);

export default TodoCard;

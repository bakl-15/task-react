import React from "react";
import  type  { Todo, Priority } from "./types";

interface EditModalProps {
  editing: Todo;
  onChange: (t: Todo) => void;
  onCancel: () => void;
  onSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ editing, onChange, onCancel, onSave }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-[#041426] rounded-md p-6 w-full max-w-lg">
      <h3 className="text-lg font-semibold mb-3">Modifier la tâche</h3>
      <input
        value={editing.text}
        onChange={e => onChange({ ...editing, text: e.target.value })}
        className="w-full px-3 py-2 rounded bg-[#071428] mb-3"
      />
      <select
        value={editing.priority}
        onChange={e => onChange({ ...editing, priority: e.target.value as Priority })}
        className="px-3 py-2 rounded bg-[#071428] mb-3"
      >
        <option value="urgente">Urgente</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Basse">Basse</option>
      </select>
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 bg-[#314b58] rounded" onClick={onCancel}>Annuler</button>
        <button className="px-4 py-2 bg-[#00aeef] text-black rounded font-semibold" onClick={onSave}>Enregistrer</button>
      </div>
    </div>
  </div>
);

export default EditModal;

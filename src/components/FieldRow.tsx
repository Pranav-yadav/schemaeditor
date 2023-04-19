import React, { useEffect } from "react";
import { FieldTypes, Field } from "../types";
import { MdAdd, MdDeleteOutline } from "react-icons/md";

export default function FieldRow({
  field,
  idx,
  onAddField,
  onDeleteField,
  onNameChange,
  onTypeChange,
  onRequiredChange,
}: FieldRowProps): JSX.Element {
  const [fieldName, setFieldName] = React.useState<string>("" + field.name);
  const handleNameChange = React.useMemo(
    () => (evt: React.ChangeEvent<HTMLInputElement>) => {
      const newName = evt.target.value;
      if (field.name === newName) return; // avoid unnecessary re-renders
      setFieldName(newName);
    },
    []
  );

  // debounce name change from input name poxy
  useEffect(() => {
    if (field.name === fieldName) return; // avoid unnecessary re-renders
    const timeoutId = setTimeout(() => {
      onNameChange(field.id, idx, fieldName);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [fieldName]);

  return (
    <div className="flex flex-row justify-between items-center my-2 ml-4 py-1 border-b text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700">
      <div className="flex flex-row">
        {/* Input for field name, controlled using proxy name state */}
        <div className="flex flex-col rounded-lg">
          <input
            type="text"
            className="text px-3 rounded-lg hover:bg-white hover:text-black focus:bg-white focus:text-black focus:scale-105 focus:shadow-lg focus:outline-neutral dark:focus:outline-gray-200 dark:focus:border dark:focus:border-gray-200 overflow-x"
            id={field.id}
            placeholder="addName"
            autoCorrect="false"
            spellCheck="false"
            title="Click to edit"
            onChange={handleNameChange}
            minLength={2}
            maxLength={20}
            size={fieldName.length}
            value={fieldName}
          ></input>
        </div>
        {/* dropdown to select type prop*/}
        <div className="flex flex-col px-2 ml-2">
          <select
            name="type"
            id="type"
            defaultValue={field.type}
            onChange={(evt) => {
              onTypeChange(
                field.id,
                idx,
                field.type,
                evt.target.value as FieldTypes
              );
            }}
            title="Click to select"
            className="rounded-lg cursor-pointer bg-gray-100 dark:bg-neutral-700 hover:bg-white dark:hover:bg-neutral-700 focus:outline-gray-200"
          >
            {Object.values(FieldTypes).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row">
        {/* switch for required prop */}
        <div className="flex flex-row items-center ml-2">
          <label htmlFor={`required-${field.id}`} className="mr-2">
            Required
          </label>
          <input
            id={`required-${field.id}`}
            type="checkbox"
            checked={field.required}
            className="cursor-pointer"
            onChange={(evt) => {
              onRequiredChange(field.id, idx, evt.target.checked);
            }}
          />
        </div>
        {/* add button for object type field*/}
        {field.type === FieldTypes.OBJECT && (
          <button
            className="hover:bg-violet-500 p-2 dark:hover:bg-violet-500 font-extrabold rounded-xl ml-2"
            onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
              onAddField(field.id);
            }}
            title="Click to add new field"
          >
            <MdAdd />
          </button>
        )}
        {/* delete button */}
        <button
          className="hover:bg-red-400 p-2 dark:hover:bg-red-500 font-bold rounded-xl ml-2"
          onClick={(evt) => {
            onDeleteField(field.id);
          }}
          title="Click to delete this field"
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}

export type FieldRowProps = {
  field: Field;
  idx: number;
  onAddField: (id: string) => void;
  onDeleteField: (id: string) => void;
  onNameChange: (id: string, idx: number, name: string) => void;
  onTypeChange: (
    id: string,
    idx: number,
    currentType: FieldTypes,
    type: FieldTypes
  ) => void;
  onRequiredChange: (id: string, idx: number, required: boolean) => void;
};

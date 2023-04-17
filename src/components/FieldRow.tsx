import React from "react";
import { FieldTypes, Field } from "../types";
import { MdAdd, MdDeleteOutline } from "react-icons/md";

export default function FieldRow({
  field,
  idx,
  onAddField,
  onTypeChange,
  onRequiredChange,
}: FieldRowProps): JSX.Element {
  const handleClickName = (
    evt: React.MouseEvent<HTMLParagraphElement>,
    id: string
  ) => {
    const elemId = evt.currentTarget.id;
    const input = document.getElementById(id);
    if (input) {
      input.focus();
      input.contentEditable = "true";
      input.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") {
          evt.preventDefault();
          input.contentEditable = "false";
        }
      });
      input.addEventListener("blur", () => {
        input.contentEditable = "false";
      });
    }
  };

  const handleClickDelete = (id: string, idx: number) => {
    // TODO: update state
    // state[id].children.
  };

  return (
    <div className="flex flex-row justify-between items-center my-2 ml-4 py-1 border-b text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700">
      <div className="flex flex-row">
        <div className="flex flex-col rounded-lg">
          <p
            className="text px-3 rounded-lg hover:bg-white hover:text-black focus:bg-white focus:text-black"
            id={field.id}
            onClick={(evt) => {
              evt.preventDefault();
              handleClickName(evt, field.id);
            }}
            placeholder="addName"
            autoCorrect="false"
            spellCheck="false"
            title="Click to edit"
          >
            {field.name || "addName"}
          </p>
        </div>
        {/* dropdown to select type prop*/}
        <div className="flex flex-col px-2 ml-2">
          <select
            name="type"
            id="type"
            defaultValue={field.type}
            onChange={(evt) => {
              evt.preventDefault();
              onTypeChange(field.id, idx, evt.currentTarget.value);
            }}
            title="Click to select"
            className="rounded-lg cursor-pointer bg-gray-100 dark:bg-neutral-700 hover:bg-white dark:hover:bg-neutral-700"
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
          <label htmlFor="required" className="mr-2 cursor-pointer">
            Required
          </label>
          <input
            type="checkbox"
            checked={field.required}
            className="cursor-pointer"
            onChange={(evt) => {
              evt.preventDefault();
              onRequiredChange(field.id, idx, evt.currentTarget.checked);
            }}
          />
        </div>
        {/* add button for object type field*/}
        {field.type === FieldTypes.OBJECT && (
          <button
            className="hover:bg-violet-500 p-2 dark:hover:bg-violet-500 font-extrabold rounded-xl ml-2"
            onClick={(evt) => {
              evt.preventDefault();
              onAddField(field.id, idx);
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
            evt.preventDefault();
            handleClickDelete(field.id, idx);
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
  onAddField: (id: string, idx: number) => void;
  onTypeChange: (id: string, idx: number, type: string) => void;
  onRequiredChange: (id: string, idx: number, required: boolean) => void;
};

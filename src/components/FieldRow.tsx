import React from "react";
import { FieldTypes, Field } from "../types";
import { MdAdd, MdDeleteOutline, MdOutlineSave } from "react-icons/md";

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

  /*   const handleClickRequired = (
    evt: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    evt.preventDefault();
    const elemId = evt.currentTarget.id;
    const value = evt.currentTarget.checked;
    const input = document.getElementById(id);
    // TODO: update state
    // state[id].required = value;
  };
 */
  /*   const handleClickAdd = (id: string, idx: number) => {
    // TODO: update state
    const newField: Field = {
      id: `${id}.${1}`,
      type: "string",
      name: "addName",
      required: false,
    };
    // state[id].children.push(newField);
    setSchema((prev) => {
      const proxyPrev = prev;
      // @ts-ignore
      if (proxyPrev[idx] && proxyPrev[idx].children) proxyPrev[idx].children.push(newField);
      else proxyPrev[idx].children = [newField];
      return [...proxyPrev];
    });
  }; */

  const handleClickDelete = (id: string, idx: number) => {
    // TODO: update state
    // state[id].children.
  };

  return (
    <div className="flex flex-row justify-between items-center my-2 ml-4 hover:bg-gray-600 border-b">
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
            className="rounded-lg cursor-pointer"
            onChange={(evt) => {
              evt.preventDefault();
              onTypeChange(field.id, idx, evt.currentTarget.value);
            }}
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
            className="hover:bg-gray-700 font-bold px-2 rounded-xl ml-2"
            onClick={(evt) => {
              evt.preventDefault();
              onAddField(field.id, idx);
            }}
          >
            <MdAdd />
          </button>
        )}
        {/* delete button */}
        <button
          className="hover:bg-gray-700 font-bold px-2 rounded-xl ml-2"
          onClick={(evt) => {
            evt.preventDefault();
            handleClickDelete(field.id, idx);
          }}
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

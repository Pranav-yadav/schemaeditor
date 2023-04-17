import React from "react";
import FieldRow from "./FieldRow";
import { FieldTypes, Field } from "../types";
import { MdAdd, MdDeleteOutline, MdOutlineSave } from "react-icons/md";

export default function SchemaEditor({
  schema,
  setSchema,
}: SchemaEditorProps): JSX.Element {
  // State Logic
  // ...

  const addAtomicField = () => {
    setSchema((prev) => {
      const newField = getNewField(prev.length);
      return [...prev, newField];
    });
  };

  const onAddField = (id: string, idx: number) => {
    const newField = getNewSubField(id, idx);
    setSchema((prev) => {
      const proxyPrev = prev;
      if (proxyPrev[idx] && proxyPrev[idx].children) {
        // @ts-ignore
        proxyPrev[idx].children.push(newField);
      } else proxyPrev[idx].children = [newField];
      return [...proxyPrev];
    });
  };

  const onTypeChange = (id: string, idx: number, type: string) => {
    setSchema((prev) => {
      const proxyPrev = prev;
      // @ts-ignore
      if (proxyPrev[idx]) proxyPrev[idx].type = type;
      return [...proxyPrev];
    });
  };

  const onRequiredChange = (id: string, idx: number, required: boolean) => {
    setSchema((prev) => {
      const proxyPrev = prev;
      // @ts-ignore
      if (proxyPrev[idx]) proxyPrev[idx].required = required;
      return [...proxyPrev];
    });
  };

  const getNewSubField = (id: string, idx: number) => {
    return {
      id: `${id}.${1}`,
      type: FieldTypes.STRING,
      name: "addName",
      required: false,
    } as Field;
  };

  const getNewField = (len: number) => {
    const newField: Field = {
      id: `${len}`,
      type: FieldTypes.STRING,
      name: "addName",
      required: false,
    };
    return newField;
  };

  const resetSchema = () => {
    setSchema([]);
    console.log("Schema Reset completed!");
  };

  const printSchema = () => {
    console.group("Schema:");
    console.log("Table View:");
    console.table(schema);
    console.log("JSON View:");
    console.log(JSON.stringify(schema, null, 2));
    console.groupEnd();
  };

  // Recursively render children if any
  const recursiveRender = (field: Field) => {
    if (field.children) {
      return (
        <div className="rounded-xl">
          {field.children.map((child: Field, idx: number) => (
            <div key={`nested-field-${child.id}`} className="ml-4 border-l">
              <FieldRow
                field={child}
                idx={idx}
                onAddField={onAddField}
                onTypeChange={onTypeChange}
                onRequiredChange={onRequiredChange}
              />
              {recursiveRender(child)}
            </div>
          ))}
        </div>
      );
    } else {
      return null; // goes to hole
    }
  };

  return (
    <div className="flex flex-col my-6 mx-4 py-4 px-6 border border-gray rounded-2xl shadow-xl">
      <div className="flex flex-row justify-between my-2">
        <h2 className="text-xl font-bold ml-6 dark:text-white">
          Field Name and Type
        </h2>
        <button
          className="bg-violet-500 hover:bg-violet-700 text-white dark:text-white font-bold py-2 px-4 rounded-xl"
          onClick={addAtomicField}
        >
          <MdAdd className="inline" /> Add Field
        </button>
      </div>
      <ol className="list-decimal">
        {schema.map((field: Field, idx: number) => (
          <li key={`field-${field.id}`} className="ml-2 rounded px-2">
            {/* Render First ever field */}
            <FieldRow
              field={field}
              idx={idx}
              onAddField={onAddField}
              onTypeChange={onTypeChange}
              onRequiredChange={onRequiredChange}
            />
            {/* Recursively render it's children if any */}
            {recursiveRender(field)}
          </li>
        ))}
      </ol>
      {/* Reset and Save Buttons */}
      <div className="flex flex-row justify-between my-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white dark:text-white font-bold py-2 px-4 rounded-xl my-4"
          onClick={resetSchema}
        >
          <MdDeleteOutline className="inline" /> Reset
        </button>
        <button
          className="bg-violet-500 hover:bg-violet-700 text-white dark:text-white font-bold py-2 px-4 rounded-xl my-4"
          onClick={printSchema}
        >
          <MdOutlineSave className="inline" /> Save
        </button>
      </div>
    </div>
  );
}

export type SchemaEditorProps = {
  schema: Field[];
  setSchema: React.Dispatch<React.SetStateAction<Field[]>>;
};

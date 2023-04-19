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

  /**
   * Adds a new field at root level of schema
   */
  const addAtomicField = () => {
    setSchema((prev) => {
      const newField = getNewField(prev.length);
      return [...prev, newField];
    });
  };

  /**
   * Adds a new "nested" field as a child
   */
  const onAddField = (id: string) => {
    console.log("Parent Field id: ", id);
    let newField: Field; // = getNewSubField(id);
    setSchema((prev) => {
      const proxyPrev = prev;
      let found = false;
      // using bfs for root level fields and update name.
      for (let i = 0; i < proxyPrev.length; i++) {
        if (proxyPrev[i].id === id) {
          if (proxyPrev[i].children) {
            newField = getNewSubField(
              proxyPrev[i].id,
              // @ts-ignore save proxyPrev[i] to a variable and use that variable instead
              proxyPrev[i].children.length
            );
            // @ts-ignore
            proxyPrev[i].children.push(newField);
          } else {
            newField = getNewSubField(proxyPrev[i].id, 0);
            proxyPrev[i].children = [newField];
          }
          found = true;
          // return [...proxyPrev];
        }
      }
      if (found) return [...proxyPrev];
      // not found in root level, search in deeply nested fields using recursion.
      const addChildField = (field: Field) => {
        if (field.id === id) {
          if (field.children) {
            newField = getNewSubField(field.id, field.children.length);
            field.children.push(newField);
          } else {
            newField = getNewSubField(field.id, 0);
            field.children = [newField];
          }
          found = true;
          return;
        }
        if (field.children && !found) {
          for (let i = 0; i < field.children.length; i++) {
            addChildField(field.children[i]);
          }
        }
      };
      for (let i = 0; i < proxyPrev.length; i++) {
        if (found) break;
        addChildField(proxyPrev[i]);
      }

      return [...proxyPrev];
    });
  };

  /**
   * Changes the name of a field
   */
  const onNameChange = (id: string, idx: number, name: string) => {
    console.log("Name Change: ", name);
    console.log("ID: ", id);
    setSchema((prev) => {
      const proxyPrev = prev;
      let found = false;
      // using bfs for root level fields and update name.
      for (let i = 0; i < proxyPrev.length; i++) {
        if (proxyPrev[i].id === id) {
          proxyPrev[i].name = name;
          found = true;
          // return [...proxyPrev];
        }
      }
      if (found) return [...proxyPrev];
      // not found in root level, search in deeply nested fields using recursion.
      const updateName = (field: Field) => {
        if (field.id === id) {
          field.name = name;
          found = true;
          return;
        }
        if (field.children && !found) {
          for (let i = 0; i < field.children.length; i++) {
            updateName(field.children[i]);
          }
        }
      };
      for (let i = 0; i < proxyPrev.length; i++) {
        if (found) break;
        updateName(proxyPrev[i]);
      }

      // if (proxyPrev[idx]) proxyPrev[idx].name = name;
      return [...proxyPrev];
    });
  };

  /**
   * Changes the type of a field
   */
  const onTypeChange = (
    id: string,
    idx: number,
    currentType: FieldTypes,
    type: FieldTypes
  ) => {
    console.log("Type Change: ", type);
    console.log("ID: ", id);
    setSchema((prev) => {
      const proxyPrev = prev;
      let found = false;
      // using bfs for root level fields and update type.
      for (let i = 0; i < proxyPrev.length; i++) {
        if (proxyPrev[i].id === id) {
          proxyPrev[i].type = type;
          found = true;
          // if type is changed from object to non-object, remove children.
          if (currentType === FieldTypes.OBJECT && type !== FieldTypes.OBJECT) {
            delete proxyPrev[i].children;
          }
        }
      }
      if (found) return [...proxyPrev];
      // not found in root level, search in deeply nested fields using recursion.
      const updateType = (field: Field) => {
        if (field.id === id) {
          field.type = type;
          found = true;
          // if type is changed from object to non-object, remove children.
          if (currentType === FieldTypes.OBJECT && type !== FieldTypes.OBJECT) {
            delete field.children;
          }
          return;
        }
        if (field.children && !found) {
          for (let i = 0; i < field.children.length; i++) {
            updateType(field.children[i]);
          }
        }
      };
      for (let i = 0; i < proxyPrev.length; i++) {
        if (found) break;
        updateType(proxyPrev[i]);
      }
      // @ts-ignore
      // if (proxyPrev[idx]) proxyPrev[idx].type = type;
      return [...proxyPrev];
    });
  };

  /**
   * Changes the required status of a field
   */
  const onRequiredChange = (id: string, idx: number, required: boolean) => {
    console.log("Required Change: ", required);
    console.log("ID: ", id);
    setSchema((prev) => {
      const proxyPrev = prev;
      let found = false;
      // using bfs for root level fields and update required.
      for (let i = 0; i < proxyPrev.length; i++) {
        if (proxyPrev[i].id === id) {
          proxyPrev[i].required = required;
          found = true;
        }
      }
      if (found) return [...proxyPrev];
      // not found in root level, search in deeply nested fields using recursion.
      const updateRequired = (field: Field) => {
        if (field.id === id) {
          field.required = required;
          found = true;
          return;
        }
        if (field.children && !found) {
          for (let i = 0; i < field.children.length; i++) {
            updateRequired(field.children[i]);
          }
        }
      };
      for (let i = 0; i < proxyPrev.length; i++) {
        if (found) break;
        updateRequired(proxyPrev[i]);
      }
      // @ts-ignore
      // if (proxyPrev[idx]) proxyPrev[idx].required = required;
      return [...proxyPrev];
    });
  };

  const getNewSubField = (id: string, currentLen: number) => {
    const newField: Field = {
      id: `${id}.${currentLen + 1}`,
      type: FieldTypes.STRING,
      name: "addName",
      required: false,
    };
    return newField;
  };

  const getNewField = (len: number) => {
    const newField: Field = {
      id: `${len + 1}`,
      type: FieldTypes.STRING,
      name: "addName",
      required: false,
    };
    return newField;
  };

  const resetSchema = () => {
    setSchema([]);
    console.log("Schema Reset!");
  };

  const printSchema = () => {
    console.group("Schema:");
    console.log("Table View:");
    console.table(schema);
    console.log("JSON View:");
    console.log(JSON.stringify(schema, null, 2));
    console.groupEnd();
  };

  // Recursively render given field's children if any
  const recursiveRender = (field: Field) => {
    if (field.children) {
      return (
        <div className="rounded-xl">
          {field.children.map((child: Field, idx: number) => (
            <div
              key={`nested-field-${child.id}-${idx}`}
              className="ml-4 border-l"
            >
              <FieldRow
                field={child}
                idx={idx}
                onAddField={onAddField}
                onNameChange={onNameChange}
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
          <li key={`field-${field.id}-${idx}`} className="ml-2 rounded px-2">
            {/* Render First ever field */}
            <FieldRow
              field={field}
              idx={idx}
              onAddField={onAddField}
              onNameChange={onNameChange}
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

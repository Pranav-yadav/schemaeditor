import { useState } from "react";
import SchemaEditor from "./components/SchemaEditor";
import { FieldTypes, Field, Schema } from "./types";
import "./App.css";

const exampleSchema: Schema = [
  {
    id: "1",
    type: FieldTypes.STRING,
    name: "First Name",
    required: true,
  },
  {
    id: "2",
    type: FieldTypes.OBJECT,
    name: "Last Name",
    required: true,
    children: [
      {
        id: "2.1",
        type: FieldTypes.OBJECT,
        name: "Middle Name",
        required: false,
        children: [
          {
            id: "2.1.1",
            type: FieldTypes.STRING,
            name: "Fathers Name",
            required: false,
          },
          {
            id: "2.1.2",
            type: FieldTypes.STRING,
            name: "Mothers Name",
            required: false,
          },
        ],
      },
      {
        id: "2.2",
        type: FieldTypes.STRING,
        name: "Last Name",
        required: true,
      },
    ],
  },
  {
    id: "3",
    type: FieldTypes.NUMBER,
    name: "Age",
    required: true,
  },
];
export default function App() {
  const [schema, setSchema] = useState<Schema>(exampleSchema);

  return (
    <div className="App">
      <h1 className="text-4xl font-bold my-4">Schema Editor</h1>
      <SchemaEditor schema={schema} setSchema={setSchema} />
    </div>
  );
}

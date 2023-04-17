# 📝schemaeditor

Simple yet complex schema editor

**NOTE**: Following is the "high-level" overview of how I am approaching this task.

## Schema Representation

We can represent the schema as an _array of objects_, where each object represents a field with properties like `id`, `name`, `type`, and `children` (for nested fields in an object type).

Example Schema:

```ts
[
  {
    id: "1",
    name: "name",
    type: string,
    required: true,
  },
  {
    id: "2",
    name: "age",
    type: number,
    required: true,
  },
  {
    id: "3",
    name: "isActive",
    type: boolean,
    required: true,
  },
  {
    id: "4",
    name: "address",
    type: object,
    required: false,
    children: [
      {
        id: "4.1",
        name: "street",
        type: string,
        required: false,
      },
      {
        id: "4.2",
        name: "city",
        type: string,
        required: false,
      },
      {
        id: "4.3",
        name: "state",
        type: string,
        required: false,
      },
      {
        id: "4.4",
        name: "zip",
        type: number,
        required: false,
      },
    ],
  },
];

type AtomicFieldType = string | number | boolean | object;
```

## Components and Handling

We'll create the following components:

1. **SchemaEditor**: The main component that holds the state of the schema and renders the fields list.
2. **FieldRow**: Represents a single field row with a input for the _name_, a dropdown for the _type_, a _delete_ button, and an optional _add_ button for object type (nested) fields.

## Rendering the Data

Creating a SchemaEditor component that accepts the schema as a prop and renders a list of FieldRow components.

```tsx
function SchemaEditor({ schema }): JSX.Element {
  // State Logic
  // ...

  return (
    <div>
      {schema.map((field) => (
        <FieldRow key={field.id} field={field} />
        {/* Recursively render it's children if any */}
        {recursiveRender(field)}
      ))}
    </div>
  );
}
```

## Editable Input Field and Updating Data

Adding an input field to the FieldRow component for editing the field name. Updating the schema in the SchemaEditor component using a state hook and pass down a callback to update the field name.

## Adding Rows and Updating Data

Adding a "+" button to the FieldRow component. When clicked, it should add a new field to the schema. If the current field is of the object type, it should add a nested field. Using a callback function passed from the SchemaEditor component to handle adding fields.

## Deleting Rows and Updating Data

Adding a trash bin icon to the FieldRow component. When clicked, it should remove the field from the schema. If it's a nested field, remove it from the parent field's children. Passing a callback from the SchemaEditor component to handle deletion.

## Save Button and Console Updated Data

Adding a "Save" button to the SchemaEditor component. When clicked, it should log the updated schema to the console.

```ts
function onSave() {
  console.log(schema);
}
```

export type Field = {
  id: string;
  name: string;
  type: FieldTypes;
  required: boolean;
  children?: Field[];
};

export enum FieldTypes {
  STRING = "STRING",
  NUMBER = "INTEGER",
  BOOLEAN = "BOOLEAN",
  OBJECT = "OBJECT",
  ARRAY = "ARRAY",
}

export type Schema = Field[];

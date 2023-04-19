export type Field = {
  id: string;
  name: string;
  type: FieldTypes;
  required: boolean;
  children?: Field[];
};

export enum FieldTypes {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  OBJECT = "OBJECT",
}

export type Schema = Field[];

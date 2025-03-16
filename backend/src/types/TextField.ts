import type { TaskFieldType } from "./TaskFieldType";

export interface TextField {
    type: TaskFieldType;
    name: string;
}

export interface TextFieldValue {
    type: TaskFieldType;
    value: string;
}

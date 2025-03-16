import type { TaskFieldType } from "./TaskFieldType.js";

export interface TextFieldLabel {
    type: TaskFieldType;
    name: string;
}

export interface TextFieldValue {
    type: TaskFieldType;
    value: string;
}

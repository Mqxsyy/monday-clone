import TextField from "../components/taskGroup/taskFields/TextField.jsx";
import TextFieldLabel from "../components/taskGroup/taskFields/TextFieldLabel.jsx";
import { TaskFieldType } from "../types/TaskFieldType.js";

const components = {
    [TaskFieldType.TextField]: {
        label: TextFieldLabel,
        field: TextField,
    },
};

export function GetTaskFieldComponent(fieldType: TaskFieldType) {
    return components[fieldType];
}

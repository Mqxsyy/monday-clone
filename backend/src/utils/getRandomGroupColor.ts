import { GroupColors } from "../config";

export default function GetRandomGroupColor() {
    const colors = Object.values(GroupColors)
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

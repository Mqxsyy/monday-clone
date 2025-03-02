import { TbFlower, TbRectangle } from "solid-icons/tb";
import BoardIcon from "../icons/BoardIcon.jsx";

export default function BoardCard() {
    return (
        <div class="inline-block bg-base-200 border border-base-300 rounded-md p-2">
            <BoardIcon />
            <div class="flex flex-row mt-4 mx-2">
                <div class="mt-1 mr-1">
                    <TbRectangle size={18} />
                </div>
                <p class="text-md font-bold">Board Name</p>
            </div>
            <div class="flex flex-row my-2">
                <div class="mx-1 mt-1">
                    <TbFlower size={16} />
                </div>
                <p class="text-sm text-base-content/75">work management &gt workspace</p>
            </div>
        </div>
    );
}

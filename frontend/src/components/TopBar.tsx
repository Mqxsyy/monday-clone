import { TbFlower, TbGridDots } from "solid-icons/tb";

export default function TopBar() {
    return (
        <div class="p-1 mx-2 mb-2 flex items-center">
            <div class="mx-1 mt-1">
                <TbGridDots size={24} />
            </div>
            <button class="btn btn-ghost text-lg font-bold" type="button">
                <div class="mx-1 mt-1">
                    <TbFlower size={24} />
                </div>
                monday <span class="font-normal">work management</span>
            </button>
        </div>
    );
}

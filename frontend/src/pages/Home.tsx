import { FaSolidAngleDown, FaSolidAngleUp } from "solid-icons/fa";
import { Match, Show, Switch, createSignal } from "solid-js";
import BoardCard from "../components/BoardCard.jsx";

export default function Home() {
    const [showBoards, setShowBoards] = createSignal(true);
    const toggleBoard = () => setShowBoards((prev) => !prev);

    return (
        <>
            <div class="p-6">
                <p class="text-sm text-base-content/75">Hello, User!</p>
                <p class="text-md font-medium">Quickly access you recent boards</p>
            </div>
            <div class="divider m-0" />
            <div class="p-6">
                <div class="bg-base-200 p-6 rounded-lg">
                    <div class="flex flex-row mb-4">
                        <div class="mx-1 mt-1">
                            <Switch>
                                <Match when={showBoards()}>
                                    <button type="button" onClick={toggleBoard}>
                                        <FaSolidAngleDown size={24} />
                                    </button>
                                </Match>
                                <Match when={!showBoards()}>
                                    <button type="button" onClick={toggleBoard}>
                                        <FaSolidAngleUp size={24} />
                                    </button>
                                </Match>
                            </Switch>
                        </div>
                        <p class="text-xl font-bold">Recently Visited</p>
                    </div>
                    <Show when={showBoards()}>
                        <BoardCard />
                    </Show>
                </div>
            </div>
        </>
    );
}

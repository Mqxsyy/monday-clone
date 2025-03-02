import { createSignal } from "solid-js";
import { ReloadSidebarBoards, selectedWorkspaceId } from "../SideBar.jsx";

export const [showCreateBoardModal, setShowCreateBoardModal] = createSignal(false);
export const toggleCreateBoardModal = () => setShowCreateBoardModal((prev) => !prev);

export default function CreateBoardModal() {
    const [title, setTitle] = createSignal("New board");

    const createBoard = async (e: SubmitEvent) => {
        toggleCreateBoardModal();

        e.preventDefault();

        if (selectedWorkspaceId() === -1) {
            return;
        }

        await fetch("http://localhost:3006/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title(),
                workspaceId: selectedWorkspaceId(),
            }),
        });

        ReloadSidebarBoards();
    };

    return (
        <div>
            {showCreateBoardModal() && (
                <dialog class="modal" open>
                    <form class="modal-box" onSubmit={createBoard}>
                        <h1 class="text-2xl font-bold">Create board</h1>

                        <fieldset class="fieldset my-4">
                            <legend class="fieldset-legend">Board Name</legend>
                            <input
                                type="text"
                                class="input w-full"
                                placeholder="New board"
                                value={title()}
                                onInput={(e) => setTitle(e.currentTarget.value)}
                                required
                            />
                        </fieldset>

                        <div class="modal-action">
                            <button class="btn btn-ghost" type="button" onClick={toggleCreateBoardModal}>
                                Cancel
                            </button>

                            <button class="btn btn-primary" type="submit">
                                Create Board
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
}

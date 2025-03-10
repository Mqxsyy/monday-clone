import { createSignal } from "solid-js";
import { ReloadWorkspaces } from "../../stores/workspaceStore.js";

export const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = createSignal(false);
export const toggleCreateWorkspaceModal = () => setShowCreateWorkspaceModal((prev) => !prev);

export default function CreateWorkspaceModal() {
    const [title, setTitle] = createSignal("New workspace");

    const createWorkspace = async (e: SubmitEvent) => {
        toggleCreateWorkspaceModal();

        e.preventDefault();

        await fetch("http://localhost:3006/workspaces", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title() }),
        });

        ReloadWorkspaces();
    };

    return (
        <div>
            {showCreateWorkspaceModal() && (
                <dialog class="modal" open>
                    <form class="modal-box" onSubmit={createWorkspace}>
                        <h1 class="text-2xl font-bold">Add new workspace</h1>

                        <div class="flex justify-center">
                            <div class="px-10 py-8 rounded-xl text-4xl bg-neutral my-8">
                                {title().charAt(0).toUpperCase()}
                            </div>
                        </div>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Workspace name</legend>
                            <input
                                type="text"
                                class="input w-full"
                                placeholder="New workspace"
                                value={title()}
                                onInput={(e) => setTitle(e.currentTarget.value)}
                                required
                            />
                        </fieldset>

                        <div class="modal-action">
                            <button class="btn btn-ghost" type="button" onClick={toggleCreateWorkspaceModal}>
                                Cancel
                            </button>

                            <button class="btn btn-primary" type="submit">
                                Add workspace
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
}

import type { ParentProps } from "solid-js";
import Dashboard from "./components/Dashboard.jsx";
import SideBar from "./components/SideBar.jsx";
import TopBar from "./components/TopBar.jsx";
import CreateBoardModal from "./components/modals/CreateBoardModal.jsx";
import CreateWorkspaceModal from "./components/modals/CreateWorkspaceModal.jsx";

export default function App(props: ParentProps) {
    return (
        <div class="flex flex-col h-screen bg-base-200">
            <TopBar />

            <div class="flex flex-row flex-1 h-0">
                <SideBar />
                <Dashboard>{props.children}</Dashboard>
            </div>

            <CreateWorkspaceModal />
            <CreateBoardModal />
        </div>
    );
}

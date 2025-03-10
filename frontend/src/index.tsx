import { render } from "solid-js/web";
import "./index.css";
import { Route, Router } from "@solidjs/router";
import App from "./App.jsx";
import Board from "./pages/Board.jsx";
import Home from "./pages/Home.jsx";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
    );
}

if (root) {
    render(
        () => (
            <Router root={App}>
                <Route path="/" component={Home} />
                <Route path="/board" component={Board} />
            </Router>
        ),
        root,
    );
}

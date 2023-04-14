import * as ReactDOMClient from "react-dom/client";
import Home from "./pages/Home/Home";
import "./assets/styles/main.scss";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(<Home />);

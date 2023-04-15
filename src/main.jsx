import * as ReactDOMClient from "react-dom/client";
import App from "./pages/App/App";
import "./assets/styles/main.scss";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(<App />);

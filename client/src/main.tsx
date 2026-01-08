import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle GitHub Pages 404 redirect
const params = new URLSearchParams(window.location.search);
const redirect = params.get('redirect');
if (redirect) {
  window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById("root")!).render(<App />);

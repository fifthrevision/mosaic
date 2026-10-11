import "@fontsource-variable/inter/opsz.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { createRoot } from "react-dom/client";
import "./studio.css";
import { StudioApp } from "./StudioApp";

createRoot(document.getElementById("root")!).render(<StudioApp />);

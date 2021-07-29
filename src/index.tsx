import { render } from "react-dom";
import "./index.css";
import Grid from "./components/Grid";
import Settings from "./components/Settings";
import { StateProvider } from "./components/Provider";
import { OverlayProvider } from "react-aria";

function App() {
  return (
    <StateProvider>
      <OverlayProvider>
        <div className="p-4">
          <h1 className="text-center text-4xl mb-4">Afghan Planner</h1>
          <Settings />
          <Grid />
        </div>
      </OverlayProvider>
    </StateProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

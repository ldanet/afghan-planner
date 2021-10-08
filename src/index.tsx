import { render } from "react-dom";
import "./index.css";
import { StateProvider } from "./components/Provider";
import { OverlayProvider } from "react-aria";
import Braid from "./components/Braid/Braid";

function App() {
  return (
    <StateProvider>
      <OverlayProvider className="h-full">
        <Braid />
      </OverlayProvider>
    </StateProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

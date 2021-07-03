import { useReducer } from "react";
import { render } from "react-dom";
import { reducer, initialState } from "./reducer";
import "./index.css";
import Settings from "./components/Settings";
import { OverlayProvider } from "react-aria";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OverlayProvider>
      <div className="p-4">
        <h1 className="text-center text-4xl mb-4">Afghan Planner</h1>
        <Settings
          squares={state.squares}
          grid={state.grid}
          selectedSquare={state.selectedSquare}
          dispatch={dispatch}
        />
      </div>
    </OverlayProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

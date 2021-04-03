import React, { useReducer } from "react";
import { render } from "react-dom";
import { reducer, initialState } from "./reducer";
import "./index.css";
import Settings from "./Settings";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1 className="text-center text-4xl">Afghan Planner</h1>
      <Settings
        squares={state.squares}
        grid={state.grid}
        selectedSquare={state.selectedSquare}
        dispatch={dispatch}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

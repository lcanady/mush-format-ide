import { createContext, useReducer } from "react";

const initialState = {
  editorText: " ",
  console: {
    arrowToggle: false,
    height: 50,
    value: "",
  },
};

// Actions
const setEditor = (text) => ({
  type: "set_editor",
  payload: text,
});

// Console resize
const consoleHeightChange = (x) => ({
  type: "console_height_change",
  payload: x,
});

// console update
const consoleUpdate = (text) => ({
  type: "console_update",
  payload: text,
});

// Reducer
const reducer = (state, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case "set_editor":
      state.editorText = action.payload;
      return state;
    case "console_height_change":
      state.console.height = action.payload;
      return state;
    case "console_update":
      state.console.value = action.payload;
      return state;
  }
};

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider
      value={{ state, dispatch, setEditor, consoleHeightChange, consoleUpdate }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;

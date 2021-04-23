import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editorValue: "",
  console: {
    value: [],
  },
};

export const EditorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditor: (state, action) => {
      state.editorValue = action.payload;
    },
    setConsole: (state, action) => {
      state.console.value = [...state.console.value, action.payload];
    },
  },
});

export const { setEditor, setConsole } = EditorSlice.actions;

export default EditorSlice.reducer;

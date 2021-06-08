import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editorValue: "",
  search: "",
  console: {
    value: "",
    height: 50,
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
      state.console.value = action.payload;
    },
    setHeight: (state, action) => {
      state.console.height = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setEditor, setConsole, setHeight, setSearch } =
  EditorSlice.actions;

export default EditorSlice.reducer;

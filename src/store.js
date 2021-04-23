import { configureStore } from "@reduxjs/toolkit";
import EditorReducer from "./slices/EditorSlice";
export default configureStore({
  reducer: {
    editor: EditorReducer,
  },
});

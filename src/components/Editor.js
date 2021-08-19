import { makeStyles, Paper } from "@material-ui/core";
import { Formatter } from "@digibear/mush-format";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";

import Console from "./Console";
import { useDispatch, useSelector } from "react-redux";
import { setConsole, setEditor } from "../slices/EditorSlice";
import debounce from "lodash.debounce";

const formatter = new Formatter();
const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "none",
  },
  toolbar: {},
  buttons: {
    marginLeft: "auto",
  },
  editorContainer: {
    flexGrow: 1,
  },
}));

const Editor = () => {
  const value = useSelector((state) => state.editor.editorValue);
  const height = useSelector((state) => state.editor.console.height);
  const dispatch = useDispatch();
  const classes = useStyles();

  const debounceFormat = debounce(async (text) => {
    const { data } = await formatter.format("\n" + text);
    dispatch(setConsole(data));
  }, 500);

  return (
    <Paper className={classes.paper} variant="outlined" square>
      <div
        className={classes.editorContainer}
        style={{
          maxHeight: `calc(100vh - (${height}px + 70px))`,
        }}
      >
        <CodeMirror
          height="100%"
          options={{
            keyMap: "sublime",
            theme: "monokai",
            lineWrapping: true,
          }}
          value={value}
          onChange={(ev) => {
            dispatch(setEditor(ev.getValue()));
            debounceFormat(ev.getValue());
          }}
        />
      </div>
      <Console />
    </Paper>
  );
};

export default Editor;

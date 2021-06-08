import { makeStyles, Paper } from "@material-ui/core";
import { Formatter } from "@digibear/mush-format";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
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
  toolbar: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
  },
  buttons: {
    marginLeft: "auto",
  },
  editorContainer: {
    flexGrow: 1,
  },
}));

const Editor = () => {
  const value = useSelector((state) => state.editor.editorValue);
  const dispatch = useDispatch();
  const classes = useStyles();

  const debounceFormat = debounce(async (text) => {
    const res = await formatter.format(text.trim());
    dispatch(setConsole(res));
  }, 500);

  return (
    <Paper className={classes.paper} variant="outlined" square>
      <div className={classes.editorContainer} style={{ height: "300px" }}>
        <CodeMirror
          height="100%"
          options={{
            keyMap: "sublime",
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

import {
  Button,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";

import Console from "./Console";
import { useDispatch, useSelector } from "react-redux";
import { EditorSlice, setConsole, setEditor } from "../slices/EditorSlice";

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

  const handleRun = async (val) => {
    const res = await fetch("http://localhost:5001/fsm-ide/us-central1/run", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ code: val }),
    });
    const data = await res.json();
    console.log(data);
    data.logs?.forEach((log) => {
      dispatch(setConsole(log));
    });
  };

  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="outlined" square>
      <Toolbar className={classes.toolbar}>
        <Typography variant="body1">Exercise Title</Typography>
        <div className={classes.buttons}>
          <Button size="small" onClick={() => handleRun(value)}>
            Run
          </Button>
          <Button size="small">Submit</Button>
        </div>
      </Toolbar>
      <div className={classes.editorContainer} style={{ height: "300px" }}>
        <CodeMirror
          height="100%"
          options={{
            keyMap: "sublime",
            mode: "js",
          }}
          value={value}
          onChange={(ev) => {
            dispatch(setEditor(ev.getValue()));
          }}
        />
      </div>
      <Console />
    </Paper>
  );
};

export default Editor;

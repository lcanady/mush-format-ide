import {
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { Resizable } from "re-resizable";
import { useState } from "react";
import TabPanel from "./TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { setHeight } from "../slices/EditorSlice";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/theme/monokai.css";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  toolbar: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
    top: 0,
  },
  arrow: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
  console: {
    fontFamily: "'Roboto Mono', monospace",
    flexShrink: 1,
  },
  line: {
    margin: 0,
    padding: 0,
  },
  consoleTitle: {
    marginLeft: theme.spacing(4),
  },
  resize: {},
}));

const Console = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  const v = useSelector((state) => state.editor.console.value);
  const height = useSelector((state) => state.editor.console.height);

  return (
    <Resizable
      className={classes.resize}
      enable={{ top: true }}
      minHeight="50px"
      maxHeight={height}
      onResize={(e, direction, ref, d) => {
        height + d.height < 120 ? setVisible(false) : setVisible(true);
      }}
      onResizeStop={(e, direction, ref, d) =>
        dispatch(setHeight(height + d.height))
      }
      size={{ height }}
    >
      <Paper variant="outlined" square className={classes.paper}>
        <Toolbar
          disableGutters
          variant="dense"
          className={classes.toolbar}
          onClick={() => {
            setVisible(!visible);
            dispatch(setHeight(height === 50 ? height + 400 : 50));
          }}
        >
          <Typography variant="h6" className={classes.consoleTitle}>
            Console
          </Typography>
          {height <= 50 ? (
            <IconButton
              className={classes.arrow}
              onClick={(ev) => {
                setVisible(true);
                dispatch(setHeight(height + 400));
              }}
            >
              <KeyboardArrowUp />
            </IconButton>
          ) : (
            <IconButton
              className={classes.arrow}
              onClick={() => {
                setVisible(false);
                dispatch(setHeight(50));
              }}
            >
              <KeyboardArrowDown />
            </IconButton>
          )}
        </Toolbar>
        <TabPanel value={0} index={visible && 0}>
          <CodeMirror
            height={`calc(${height}px - 50px)`}
            options={{
              keyMap: "sublime",
              theme: "monokai",
              lineWrapping: true,
            }}
            value={v}
          />
        </TabPanel>
      </Paper>
    </Resizable>
  );
};

export default Console;

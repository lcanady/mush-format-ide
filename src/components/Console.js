import {
  IconButton,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { Resizable } from "re-resizable";
import { useState } from "react";
import TabPanel from "./TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { setHeight } from "../slices/EditorSlice";

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
  resize: {},
}));

const Console = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  const value = useSelector((state) => state.editor.console.value);
  const height = useSelector((state) => state.editor.console.height);

  return (
    <Resizable
      className={classes.resize}
      enable={{ top: true }}
      minHeight="50px"
      maxHeight="50vh"
      onResize={(e, direction, ref, d) =>
        height + d.height < 120 ? setVisible(false) : setVisible(true)
      }
      onResizeStop={(e, direction, ref, d) =>
        dispatch(setHeight(height + d.height))
      }
      size={{ height }}
    >
      <Paper variant="outlined" square className={classes.paper}>
        <Toolbar disableGutters variant="dense" className={classes.toolbar}>
          <Tabs indicatorColor="primary" value={0}>
            <Tab label="Console" />
          </Tabs>
          {height <= 50 ? (
            <IconButton
              className={classes.arrow}
              onClick={() => {
                setVisible(true);
                dispatch(setHeight(height + 300));
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
          <div
            className={classes.console}
            style={{
              maxHeight: `calc(${height}px - 56px)`,
              overflow: "auto",
              padding: "8px",
            }}
          >
            {value.split("\n").map((line) => (
              <p className={classes.line}>{line}</p>
            ))}
          </div>
        </TabPanel>
      </Paper>
    </Resizable>
  );
};

export default Console;

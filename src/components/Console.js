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
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    borderLeft: "none",
    height: "100%",
  },
  toolbar: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
  },
  arrow: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
  console: {
    fontFamily: "'Roboto Mono', monospace",
  },
}));

const Console = () => {
  const [height, setHeight] = useState(50);
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  const value = useSelector((state) => state.editor.console.value);

  return (
    <Resizable
      className={classes.resize}
      enable={{ top: true }}
      minHeight="50px"
      maxHeight="50vh"
      onResize={(e, direction, ref, d) =>
        height + d.height < 120 ? setVisible(false) : setVisible(true)
      }
      onResizeStop={(e, direction, ref, d) => setHeight(height + d.height)}
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
                setHeight(height + 600);
              }}
            >
              <KeyboardArrowUp />
            </IconButton>
          ) : (
            <IconButton
              className={classes.arrow}
              onClick={() => {
                setVisible(false);
                setHeight(50);
              }}
            >
              <KeyboardArrowDown />
            </IconButton>
          )}
        </Toolbar>
        <TabPanel value={0} index={visible && 0}>
          <div className={classes.console}>
            {value.map((log, idx) => {
              if (log.type === "info") return <p key={idx}>{log.data}</p>;
            })}
          </div>
        </TabPanel>
      </Paper>
    </Resizable>
  );
};

export default Console;

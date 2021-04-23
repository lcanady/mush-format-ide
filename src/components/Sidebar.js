import ReactMarkdown from "react-markdown";
import {
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";

import remarkGfm from "remark-gfm";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  sideNav: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
  },
  rightButton: {
    marginLeft: "auto",
  },
  sidebar: {
    height: "100%",
  },
  markdown: {
    padding: `0 ${theme.spacing(4)}px`,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.sidebar} variant="outlined" square>
      <Toolbar className={classes.sideNav}>
        <IconButton edge="start">
          <ArrowBackIcon />
        </IconButton>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography variant="body1">Lesson / Exercise</Typography>
        <IconButton className={classes.rightButton}>
          <ArrowForwardIcon />
        </IconButton>
      </Toolbar>
      <div className={classes.markdown}>
        <ReactMarkdown plugins={remarkGfm}></ReactMarkdown>
      </div>
    </Paper>
  );
};

export default Sidebar;

import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import Editor from "../components/Editor";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxHeight: "100vh",
    overflow: "none",
  },
  rightIcons: {
    marginLeft: "auto",
  },
}));

function EditorPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Nav>
        <Typography variant="h6">Full Stack Master Testing Platform</Typography>
        <IconButton color="inherit" className={classes.rightIcons}>
          <AddIcon />
        </IconButton>
      </Nav>
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <Editor />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditorPage;

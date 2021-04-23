import Nav from "../components/Nav";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Button,
  Container,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";

const useStyles = makeStyles((theme) => ({
  textField: {
    padding: `${theme.spacing(2)}px 0`,
  },
  editorFrame: {
    height: "30vh",
    border: "solid 1px rgba(0,0,0,.2)",
    marginBottom: theme.spacing(3),
  },
  editorTitle: {
    padding: `${theme.spacing(1)}px 0`,
    borderBottom: "1px solid rgba(0,0,0,.2)",
  },
}));

const NewLesson = () => {
  const classes = useStyles();
  return (
    <div>
      <Nav>
        <IconButton edge="start" color="inherit">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Create A New Exercise</Typography>
      </Nav>
      <Container>
        <TextField
          className={classes.textField}
          placeholder="Exercise Name"
          fullWidth
        ></TextField>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Code Editor
        </Typography>
        <div className={classes.editorFrame}>
          <CodeMirror
            height="100%"
            options={{
              keyMap: "sublime",
              mode: "js",
            }}
          />
        </div>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Exercise Tests
        </Typography>
        <div className={classes.editorFrame}>
          <CodeMirror
            height="100%"
            options={{
              keyMap: "sublime",
              mode: "js",
            }}
          />
        </div>
        <Button variant="contained" color="primary">
          Save Exercise
        </Button>
      </Container>
    </div>
  );
};

export default NewLesson;

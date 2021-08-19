import { formatter } from "@digibear/mush-format";
import {
  Button,
  fade,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import GitHub from "@material-ui/icons/GitHub";
import gitHub from "@material-ui/icons/GitHub";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../components/Editor";
import Nav from "../components/Nav";
import { setEditor, setSearch } from "../slices/EditorSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxHeight: "100vh",
    overflow: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "auto",
      width: "300px",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing.apply(4)}px)`,
    width: "260px",
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  rightIcons: {
    marginLeft: "auto",
  },
}));

function EditorPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.editor.search);
  return (
    <div className={classes.root}>
      <Nav>
        <Typography variant="h6">MUSH-Format IDE</Typography>
        <div className={classes.search}>
          <InputBase
            placeholder="git:<user>/<repo>@branch/path"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={value}
            onChange={(ev) => {
              dispatch(setSearch(ev.currentTarget.value));
            }}
            onKeyPress={async (ev) => {
              if (ev.key === "Enter") {
                const { combined } = await formatter.format(
                  "#include " + value
                );

                dispatch(setEditor(combined));
              }
            }}
          />
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          onClick={async () => {
            const { data, combined } = await formatter.format(
              "#include " + value
            );

            dispatch(setEditor(combined));
            console.log(data);
          }}
        >
          Load
        </Button>
        <IconButton
          onClick={() =>
            window
              .open("https://github.com/digibear-io/mush-format", "_blank")
              .focus()
          }
        >
          <GitHub />
        </IconButton>
      </Nav>
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Editor />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditorPage;

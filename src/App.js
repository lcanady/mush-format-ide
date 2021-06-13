import { BrowserRouter as Router, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Route path="/" exact component={EditorPage} />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

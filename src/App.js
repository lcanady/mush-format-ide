import { BrowserRouter as Router, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import NewLesson from "./pages/NewLesson";
import { CssBaseline } from "@material-ui/core";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/new" exact component={NewLesson} />
        <Route path="/" exact component={EditorPage} />
      </Router>
    </>
  );
}

export default App;

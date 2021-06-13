import { AppBar, Toolbar } from "@material-ui/core";

const Nav = ({ children }) => {
  return (
    <AppBar position="static" variant="outlined" color="default">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};

export default Nav;

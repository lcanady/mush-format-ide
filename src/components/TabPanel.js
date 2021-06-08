import { Box, createStyles } from "@material-ui/core";

const useStyles = createStyles((theme) => ({
  root: {},
}));

const TabPanel = ({ children, value, index, ...other }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      hidden={value !== index}
      id={`simple-tab-panel-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
};

export default TabPanel;

import { Box, createStyles } from "@material-ui/core";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

const TabPanel = ({ children, value, index, ...other }) => {
  const classes = useStyles();
  return (
    <div
      role="tabpannel"
      className={classes.root}
      hidden={value !== index}
      id={`simple-tab-panel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;

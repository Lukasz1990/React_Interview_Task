import React from "react";
import Search from "../components/Search";
import {
  Box,
  Typography,
  Container,
  Card,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: ({}) => ({
    display: "flex",
    width: "600px",
    padding: "40px",
    margin: "0 auto",
  }),
  title: {
    fontWeight: "bold",
    fontSize: "20px",
  },
}));

const Main = ({}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <Box>
        <Typography className={classes.title}>React Interview Task</Typography>
      </Box>
      <Container maxWidth="lg">
        <Box mt={3}>
          <Search />
        </Box>
      </Container>
    </Card>
  );
};

export default Main;

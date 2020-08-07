import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Card,
  Divider,
  makeStyles,
  Typography,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import Button from "./Button";
import { fetchUsers } from "../redux/fetchUsers";
import { fetchRepo } from "../redux/fetchRepo";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: ({}) => ({
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: 0.5,
  }),
  userCard: {
    display: "flex",
    flexDirection: "column",
    background: "#e0e0e0",
    padding: "10px",
    marginTop: "10px",
    maxWidth: "350px",
    margin: "0 auto",
    minHeight: "100px",
  },
  repoTitle: {
    fontWeight: "bold",
    margin: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  repoDesc: {
    display: "flex",
  },
  showing: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  search: {
    marginTop: "10px",
  },
  tree: {
    padding: "10px",
  },
  treeView: {
    paddingTop: "10px",
  },
}));

const Search = ({}) => {
  const filteredUsers = useSelector((state) => state.usersReducer.users);
  const filteredRepos = useSelector((state) => state.usersReducer.repos);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [showed, setShowed] = useState(false);
  const stars = Math.floor(Math.random() * 100);
  async function mapRepos(user) {
    const REPOS_URL = `https://api.github.com/users/${user}/repos`;

    const ReposResponse = await axios(REPOS_URL);
    const repos = await ReposResponse.data;
    if (repos) {
      dispatch(fetchRepo(repos));
    }
  }
  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const fetchdata = async (user) => {
    const USERS_URL = `https://api.github.com/search/users?q=${user}+in:user`;
    const response = await axios(USERS_URL);
    const data = await response.data;
    const users = data.items;
    const usersLength = Object.entries(users).length;
    const filteredUsers =
      usersLength > 5
        ? Object.entries(users)
            .slice(0, 5)
            .map((entry) => entry[1])
        : users;
    setShowed(true);
    dispatch(fetchUsers(filteredUsers));
  };

  const onSearchHandler = () => fetchdata(user);

  return (
    <Card className={clsx(classes.root)}>
      <Box display="flex" alignItems="center">
        <SearchIcon className={classes.search} />
        <TextField
          variant="standard"
          placeholder="Enter username"
          margin="normal"
          onChange={handleChange}
        />
      </Box>
      <Divider />
      <Divider />
      <Button onSearchHandler={onSearchHandler}>Search</Button>
      {showed && (
        <Typography m={3} className={classes.showing}>
          Showing user for {user}
        </Typography>
      )}

      <Divider></Divider>
      {filteredUsers && (
        <TreeView
          className={classes.treeView}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {filteredUsers.map((user) => (
            <Box key={user.id}>
              <TreeItem
                nodeId={user.id}
                label={user.login}
                onClick={() => mapRepos(user.login)}
                className={classes.tree}
              >
                {user.login &&
                  filteredRepos.map((repo) => (
                    <Card keys={repo.id} className={classes.userCard}>
                      <Typography className={classes.repoTitle}>
                        {repo.name}
                        <Typography>
                          <StarIcon />
                        </Typography>
                      </Typography>
                      <Typography className={classes.repoDesc}>
                        {repo.description}
                      </Typography>
                    </Card>
                  ))}

                <Divider></Divider>
              </TreeItem>
              <Divider></Divider>
            </Box>
          ))}
        </TreeView>
      )}
    </Card>
  );
};

export default Search;

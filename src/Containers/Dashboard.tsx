import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import MainPage from "./MainPage";
import Table from "../Components/Table";
import { useDispatch } from "react-redux";
import { updateConfigs, setUser } from "../Action";

const Dashboard = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Sager Storehouse
          </Typography>
          <Button
            sx={{ color: "white" }}
            variant="text"
            onClick={() => {
              dispatch(updateConfigs({ signedIn: false }));
              dispatch(setUser({}));
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Users", "Products", "Categories"].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, pl: 32, pt: 10, pr: 2 }}>
        {pathname === "/" ? <MainPage /> : <Table type={"users"} />}
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;

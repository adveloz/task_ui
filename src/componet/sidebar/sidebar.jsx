import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { Box, Tooltip } from "@mui/material";

function Sidebar() {
  return (
    <React.Fragment>
      <Box className="sidebar">
        <MenuList className="menu">
          <MenuItem>
            <Link to="/">
              <ListItemIcon  style={{ color: "#f1f1f1"}}>
                <Tooltip title="Inicio" placement="top">
                  <HomeIcon fontSize='large' />
                </Tooltip>
              </ListItemIcon>
            </Link>
          </MenuItem>
            <MenuItem>
              <Link to="/addItem">
                <ListItemIcon style={{ color: "#f1f1f1" }}>
                  <Tooltip title="Add Task" placement="top">
                    <AddIcon fontSize='large' />
                  </Tooltip>
                </ListItemIcon>
              </Link>
            </MenuItem>
        </MenuList>
      </Box>
    </React.Fragment>
  );
}

export default Sidebar;
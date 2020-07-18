import React, {useState} from 'react';

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import PersonIcon from '@material-ui/icons/Person';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const UserMenu = ({user, logout}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button color="inherit" component={NavLink} to="/addPlace" exact>Add new place</Button>
            <IconButton color="inherit" onClick={handleClick}>
                <PersonIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <ListItem disabled>Hello, {user.firstName || user.username}!</ListItem>
                <Divider/>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
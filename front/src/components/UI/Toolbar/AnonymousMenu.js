import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => (
    <>
        <Button color="inherit" component={NavLink} to="/register" exact>Sign Up</Button>
        <Button color="inherit" component={NavLink} to="/login" exact>Sign In</Button>
    </>
);

export default AnonymousMenu;
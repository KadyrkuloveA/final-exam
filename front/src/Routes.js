import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Eateries from "./containers/Eateries/Eateries";
import AddPlace from "./containers/AddPlace/AddPlace";
import Eatery from "./containers/Eatery/Eatery";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Switch>
        <Route path="/" exact component={Eateries}/>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/eateries/:id" exact component={Eatery} />
        <ProtectedRoute isAllowed={user} path="/addPlace" exact component={AddPlace}/>
    </Switch>
  );
};

export default Routes;
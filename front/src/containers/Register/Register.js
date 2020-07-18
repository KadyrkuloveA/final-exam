import React, {Component} from 'react';
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    username: '',
    password: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.registerUser({...this.state});
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <>
        <Grid container justify="center">
          <Grid item xs={12} md={10} lg={4}>
            <Box pt={2} pb={2}>
              <Typography variant="h4">Register</Typography>
            </Box>

            <form onSubmit={this.submitFormHandler}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <FormElement
                    propertyName="username"
                    title="Username"
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('username')}
                    placeholder="Enter username"
                    autoComplete="new-username"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="password"
                    title="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('password')}
                    placeholder="Enter password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" color="primary" variant="contained">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.registerError,
  loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
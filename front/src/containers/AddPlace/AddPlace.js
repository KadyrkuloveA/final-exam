import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {addEatery} from "../../store/actions/eateriesActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {toast} from "react-toastify";

class AddPlace extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        confirmed: false,
    };

    submitFormHandler = async event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });

        if (this.state.confirmed) {
            await this.props.addEatery(formData);
            this.props.history.push('/');
        } else {
            toast.error('Confirm privacy policy');
        }

    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };

    render() {
        return (
            <Fragment>
                <Box pb={2} pt={2}>
                    <Typography variant="h4">New Place</Typography>
                </Box>

                <form onSubmit={this.submitFormHandler}>
                    <Grid item xs>
                        <FormElement
                            type="text"
                            propertyName="title" required
                            title="Title"
                            placeholder="Enter product title"
                            onChange={this.inputChangeHandler}
                            value={this.state.title}
                        />
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            type="text"
                            propertyName="description" required
                            title="Description"
                            placeholder="Enter product title"
                            onChange={this.inputChangeHandler}
                            value={this.state.description}
                        />
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            type="file"
                            propertyName="image"
                            title="Image"
                            onChange={this.fileChangeHandler}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.confirmed} onChange={this.handleChange} name="confirmed" />}
                            label="Secondary"
                        />
                    </Grid>
                    <Grid item xs>
                        <Button type="submit" color="primary" variant="contained">Add</Button>
                    </Grid>
                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addEatery: (eateryData) => dispatch(addEatery(eateryData)),
});

export default connect(null, mapDispatchToProps)(AddPlace);
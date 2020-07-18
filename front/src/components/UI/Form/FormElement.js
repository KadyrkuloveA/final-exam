import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from "react-draft-wysiwyg";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FileInput from "./FileInput";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  wysiwyg: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: theme.shape.borderRadius
  }
}));

const FormElement = props => {
  const classes = useStyles();

  let inputChildren = undefined;

  if (props.type === 'select') {
    inputChildren = props.options.map(o => (
      <MenuItem key={o.id} value={o.id}>
        {o.title}
      </MenuItem>
    ));
  }

  let inputComponent = (
    <TextField
      fullWidth
      variant="outlined"
      label={props.title}
      error={!!props.error}
      type={props.type}
      select={props.type === 'select'}
      name={props.propertyName} id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      children={inputChildren}
      helperText={props.error}
    >
      {inputChildren}
    </TextField>
  );

  if (props.type === 'wysiwyg') {
    inputComponent = (
      <Editor
        contentState={null}
        onContentStateChange={props.onChange}
        editorClassName={classes.wysiwyg}
      />
    );
  }

  if (props.type === 'file') {
    inputComponent = (
      <FileInput
        label={props.title}
        name={props.propertyName}
        onChange={props.onChange}
      />
    )
  }

  if (props.type === 'tags') {
    inputComponent = (
      <Autocomplete
        multiple
        options={props.tags}
        onChange={props.onChange}
        value={props.value}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={props.title} />
        )}
      />
    )
  }

  return inputComponent;
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  autoComplete: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default FormElement;
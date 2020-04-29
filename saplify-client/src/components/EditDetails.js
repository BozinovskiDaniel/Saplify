import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/myButton";
// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

// Redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: "right",
  },
});

function EditDetails(props) {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const { classes } = props;

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.name == "bio") setBio(event.target.value);
    else if (event.target.name == "website") setWebsite(event.target.value);
    else setLocation(event.target.value);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    props.editUserDetails(userDetails);
    handleClose();
  };

  useEffect(() => {
    const { credentials } = props;
    mapUserDetailsToState(credentials);
  }, []);

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal website"
              className={classes.textField}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);

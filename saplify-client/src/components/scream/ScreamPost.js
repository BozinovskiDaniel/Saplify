import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  myDiv: {
    backgroundColor: "#fff",
    width: "100%",
    height: 160,
    marginBottom: 20,
    borderRadius: 5,
  },
  userPostImage: {
    borderRadius: 50,
    height: 70,
    width: 70,
    margin: "30px auto 0 30px",
    padding: 5,
    objectFit: "cover",
  },
  submitButton: {
    position: "relative",
    marginBottom: "5px",
    marginTop: "5px",
  },
  progressSpinner: {
    position: "absolute",
  },
  footerPost: {
    display: "inline-block",
    float: "right",
  },
  postScream: {
    padding: "0 10px",
  },
});

function ScreamPost(props) {
  const [errors, setErrors] = useState({});
  const [body, setBody] = useState("");

  const {
    classes,
    user: {
      credentials: { handle, imageUrl },
      authenticated,
    },
    UI: { loading },
  } = props;

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if (!props.UI.errors && !props.UI.loading) {
      setBody("");
      setErrors({});
    }
  }, [props]);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postScream({ body });
  };

  const profile = "/users/".concat(handle);

  let postScreamMarkup = authenticated ? (
    <Grid container className={classes.myDiv}>
      <Grid item sm={3}>
        <a href={profile}>
          <img
            src={imageUrl}
            alt="user image"
            className={classes.userPostImage}
          />
        </a>
      </Grid>
      <Grid item sm={8} className={classes.postScream}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Scream!!"
            multiline
            rows="3"
            placeholder="Scream at your fellow Saplings!"
            error={errors.body ? true : false}
            helperText={errors.body}
            className={classes.textField}
            onChange={handleChange}
            fullWidth
          />
          <div className={classes.footerPost}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Post
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </div>
        </form>
      </Grid>
      <Grid item sm={1}></Grid>
    </Grid>
  ) : null;

  return <Fragment>{postScreamMarkup}</Fragment>;
}

ScreamPost.propTypes = {
  user: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(ScreamPost)
);

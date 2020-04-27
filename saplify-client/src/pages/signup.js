import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/main.png";
import { Link } from "react-router-dom";

// Material UI Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux Imports
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errors, setErrors] = useState({});
  const {
    classes,
    UI: { loading },
  } = props;

  useEffect(() => {
    console.log(props);
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setLoading(true);
    // Send request to server
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };

    props.signupUser(newUserData, props.history);
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else setHandle(e.target.value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img
          src={AppIcon}
          alt="app icon"
          height="50px"
          width="35px"
          className={classes.image}
        />
        <Typography variant="h3" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="handle"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Log in <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);

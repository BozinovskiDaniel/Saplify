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

// Redux Stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(props);

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
    // Send request to server
    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData, props.history);
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
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
          Login
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
            Login
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));

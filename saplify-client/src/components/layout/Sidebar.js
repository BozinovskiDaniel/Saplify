import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/myButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
import FriendsList from "./FriendsList";

// Material UI Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

// Icons
import HomeIcon from "@material-ui/icons/Home";

const styles = (theme) => ({
  toolie: {
    height: "100vh",
    width: "1%",
    position: "absolute",
    backgroundColor: theme.palette.primary.main,
  },
});

function Sidebar(props) {
  const { authenticated, classes } = props;

  return (
    <AppBar>
      <Toolbar className={classes.toolie}>
        {authenticated ? (
          <Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
            <FriendsList />
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

Sidebar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Sidebar));

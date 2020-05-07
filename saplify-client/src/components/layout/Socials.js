import React from "react";
import PropTypes from "prop-types";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import TwitterIcon from "@material-ui/icons/Twitter";
import withStyles from "@material-ui/core/styles/withStyles";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: "10px 30px 20px 30px",
    marginBottom: 20,
  },
  title: {
    marginLeft: "16px",
    paddingTop: "12px",
    paddingBottom: "10px",
    fontSize: "20px",
    fontWeight: "400",
    borderBottom: "3px #32CD32 solid",
  },
  facebook: {
    backgroundColor: "#2f5b9d",
    color: "#eee",
    fontWeight: "500",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    "&:hover": {
      backgroundColor: "#2f5b9d",
    },
  },
  twitter: {
    backgroundColor: "#38bff1",
    color: "#eee",
    fontWeight: "500",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    "&:hover": {
      backgroundColor: "#38bff1",
    },
  },
  youtube: {
    backgroundColor: "#f24756",
    color: "#eee",
    fontWeight: "500",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    "&:hover": {
      backgroundColor: "#f24756",
    },
  },
});

function Socials(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.title}>Socials</div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.facebook}>
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText primary="Facebook" />
        </ListItem>

        <ListItem button className={classes.twitter}>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>

        <ListItem button className={classes.youtube}>
          <ListItemIcon>
            <YouTubeIcon />
          </ListItemIcon>
          <ListItemText primary="Youtube" />
        </ListItem>
      </List>
    </div>
  );
}

export default connect(null, { logoutUser })(withStyles(styles)(Socials));

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
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  title: {
    marginLeft: "16px",
    paddingTop: "12px",
    paddingBottom: "10px",
    fontSize: "20px",
    fontWeight: "400",
  },
});

function ShortCuts(props) {
  const { classes } = props;

  const handleLogout = () => {
    props.logoutUser();
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>Shortcuts</div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="News Feed" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </ListItem>
      </List>
    </div>
  );
}

export default connect(null, { logoutUser })(withStyles(styles)(ShortCuts));

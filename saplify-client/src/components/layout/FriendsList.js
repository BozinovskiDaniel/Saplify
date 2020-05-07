import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Material Ui
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

// Icons
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";

// Redux
import { connect } from "react-redux";
import axios from "axios";

function FriendsList(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get("/getFriends").then((res) => {
      setFriends(res.data);
    });
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let friendsListMarkup =
    friends && friends.length > 0 ? (
      friends.map((friend) => {
        return (
          <MenuItem key={friend.createdAt} onClick={handleClose}>
            <PersonIcon color="primary" style={{ marginRight: 10 }} />
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${friend.handle}`}
            >
              {friend.handle} is your Friend!
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no friends yet</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip title="Friends list">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          <PeopleIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {friendsListMarkup}
      </Menu>
    </Fragment>
  );
}

export default FriendsList;

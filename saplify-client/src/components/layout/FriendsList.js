import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Material Ui
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

// Icons
import NotificationIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleIcon from "@material-ui/icons/People";

// Redux
import { connect } from "react-redux";

function FriendsList(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <p>Markup</p>
      </Menu>
    </Fragment>
  );
}

export default FriendsList;

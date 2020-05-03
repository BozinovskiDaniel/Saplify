import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { markNotificationRead } from "../../redux/actions/userActions";

function Notifications(props) {
  const { anchorEl, setAnchorEl } = useState(null);

  const { notifications } = props.notifications;

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color="secondary"
          >
            <NotificationIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationIcon />);
  } else {
    notificationsIcon = <NotificationIcon />;
  }

  return (
    <Fragment>
      <Tooltip title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-has-popup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

Notifications.propTypes = {
  markNotificationRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { markNotificationRead })(
  Notifications
);

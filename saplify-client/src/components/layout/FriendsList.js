import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyButton from "../../util/myButton";

// Material UI
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

// Icons
import PeopleIcon from "@material-ui/icons/People";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// Redux
import axios from "axios";

function FriendsList(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [friends, setFriends] = useState([]);

  const { classes } = props;

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

  const removeFriend = () => {
    alert("Friend removed!");
  };

  let friendsListMarkup =
    friends && friends.length > 0 ? (
      friends.map((friend) => {
        return (
          <MenuItem key={friend.createdAt} onClick={handleClose}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item sm={3}>
                <img
                  src={friend.imageUrl}
                  style={{
                    marginRight: 10,
                    borderRadius: 50,
                    objectFit: "cover",
                  }}
                  height="50px"
                  width="50px"
                />
              </Grid>
              <Grid item sm={7}>
                <Typography
                  component={Link}
                  color="default"
                  variant="body1"
                  to={`/users/${friend.handle}`}
                >
                  {friend.handle} is your friend!
                </Typography>
              </Grid>
              <Grid item sm={2}>
                <MyButton tip="Remove friend" onClick={removeFriend}>
                  <DeleteOutline color="secondary" />
                </MyButton>
              </Grid>
            </Grid>
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

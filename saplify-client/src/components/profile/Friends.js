import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MuiLink from "@material-ui/core/Link";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  myContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  title: {
    marginLeft: "16px",
    paddingTop: "12px",
    paddingBottom: "10px",
    fontSize: "20px",
    fontWeight: "400",
    borderBottom: "3px #32CD32 solid",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 70,
    height: 70,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "80%",
    maxHeight: "100%",
    borderRadius: 50,
  },
  friendsChatIcon: {
    color: theme.palette.primary.light,
    fontSize: 20,
  },
});

function Friends(props) {
  const {
    classes,
    user: {
      credentials: { friends },
      authenticated,
    },
  } = props;

  let friendsListMarkup =
    friends && authenticated && friends.length > 0 ? (
      <Grid container className={classes.myContainer}>
        <Grid item sm={12} style={{ paddingBottom: "20px" }}>
          <div className={classes.title}>Friends</div>
        </Grid>
        {friends.map((friend) => (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={friend.imageUrl}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        <MuiLink
                          component={Link}
                          to={`/users/${friend.handle}`}
                          color="primary"
                          variant="h6"
                        >
                          @{friend.handle}
                        </MuiLink>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {friend.email}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ChatBubbleIcon className={classes.friendsChatIcon} />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </Grid>
    ) : null;

  return <Fragment>{friendsListMarkup}</Fragment>;
}

Friends.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Friends));

import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/myButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
// Redux
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
});

function ScreamDialog(props) {
  const [open, setOpen] = useState(false);

  const {
    classes,
    scream: {
      screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
    },
    UI: { loading },
  } = props;

  const handleOpen = () => {
    setOpen(true);
    props.getScream(props.screamId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <CircularProgress size={200} />
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={5}>
        <img src={userImage} alt="prof" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary">
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <MyButton
              tip="Close"
              onClick={handleClose}
              tipClassName={classes.closeButton}
            >
              <CloseIcon />
            </MyButton>
            <DialogContent className={classes.DialogContent}>
              {dialogMarkup}
            </DialogContent>
          </Dialog>
        </UnfoldMore>
      </MyButton>
    </Fragment>
  );
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));

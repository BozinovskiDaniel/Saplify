import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import ShortCuts from "../components/layout/ShortCuts";
import ScreamPost from "../components/scream/ScreamPost";
import Friends from "../components/profile/Friends";
import Socials from "../components/layout/Socials";

// Material Ui
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  myContainer: {
    margin: "60px 60px auto 60px",
  },
  coverImage: {
    boxShadow: "inset 0 0 0 100vw rgba(0,0,0,0.25)",
    background: `url()`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "47vh",
  },
  insideCover: {
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
  editCoverPhotoBtn: {
    left: "24%",
    top: "80%",
    color: "#eee",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    fontSize: 12,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.0)",
      outline: "0.5px solid #32CD32",
    },
  },
  addFriendBtn: {
    left: "70%",
    top: "80%",
    backgroundColor: theme.palette.primary.main,
    color: "#eee",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.0)",
      outline: "0.5px solid #32CD32",
    },
  },
  selectionBar: {
    height: "9vh",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    position: "relative",
  },
  ul: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-30%)",
  },
  li: {
    display: "inline",
    padding: "5px 30px",
    top: "100px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  navtitle: {
    display: "inline",
    paddingRight: "100px",
    fontSize: "35px",
    fontWeight: "700",
    color: theme.palette.primary.light,
  },
  navImageContainer: {
    position: "absolute",
    zIndex: 1,
    left: "9%",
    bottom: "60%",
  },
  navImage: {
    borderRadius: "50%",
    height: 185,
    width: 185,
    border: "6px solid #eee",
  },
});

// User Page
function User(props) {
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);
  const {
    classes,
    user: { credentials },
  } = props;

  useEffect(() => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;

    if (screamId) setScreamIdParam(screamId);

    props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        console.log(res);
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { screams, loading } = props.data;

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams == null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );

  return (
    <div className={classes.myContainer}>
      <div className={classes.coverImage}>
        {console.log({ credentials })}
        <div className={classes.insideCover}>
          {profile ? (
            profile.handle === props.user.credentials.handle ? (
              <Button variant="contained" className={classes.editCoverPhotoBtn}>
                <CameraAltIcon style={{ paddingRight: "10px" }} />
                Edit Cover Photo
              </Button>
            ) : null
          ) : null}
          {profile ? (
            profile.handle !== props.user.credentials.handle ? (
              <Button variant="contained" className={classes.addFriendBtn}>
                Add Friend
              </Button>
            ) : null
          ) : null}
        </div>
      </div>
      <div className={classes.selectionBar}>
        <ul className={classes.ul}>
          <li className={classes.navImageContainer}>
            {profile ? (
              <img
                src={profile.imageUrl}
                alt="profile image"
                className={classes.navImage}
              />
            ) : null}
          </li>
          <li className={classes.navtitle}>
            {profile ? profile.handle : null}
          </li>
          <li className={classes.li}>Time line</li>
          <li className={classes.li}>Photos</li>
          <li className={classes.li}>Videos</li>
          <li className={classes.li}>Friends</li>
          <li className={classes.li}>About</li>
        </ul>
      </div>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Socials />
          <ShortCuts />
        </Grid>
        <Grid item sm={6} xs={12}>
          {profile ? (
            profile.handle === props.user.credentials.handle ? (
              <ScreamPost />
            ) : null
          ) : null}
          {screamsMarkup}
        </Grid>
        <Grid item sm={3} xs={12}>
          {profile == null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={profile} />
          )}
          <Friends />
        </Grid>
        <Grid item sm={1} />
      </Grid>
    </div>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(User)
);

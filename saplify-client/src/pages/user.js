import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import { getUserData } from "../redux/actions/dataActions";
import { uploadCoverImage } from "../redux/actions/userActions";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import ShortCuts from "../components/layout/ShortCuts";
import ScreamPost from "../components/scream/ScreamPost";
import Friends from "../components/profile/Friends";
import Socials from "../components/layout/Socials";
import TopSection from "../components/profile/TopSection";

// Material Ui
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  myContainer: {
    margin: "60px 60px auto 60px",
  },
});

// User Page
function User(props) {
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);
  const { classes } = props;

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
      <TopSection profile={profile} />
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
  uploadCoverImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const mapActionsToProps = { getUserData, uploadCoverImage };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(User));

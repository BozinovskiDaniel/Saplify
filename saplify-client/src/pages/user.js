import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// Material Ui
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  myContainer: {
    marginTop: 60,
  },
  coverImage: {
    boxShadow: "inset 0 0 0 100vw rgba(0,0,0,0.25)",
    background:
      "url(https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "47vh",
  },
  selectionBar: {
    height: "8vh",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    marginBottom: 12,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  ul: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  li: {
    display: "inline",
    padding: "5px 10px",
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
      <div className={classes.coverImage} />
      <div className={classes.selectionBar}>
        <ul className={classes.ul}>
          <li className={classes.navtitle}></li>
          <li className={classes.li}>Time line</li>
          <li className={classes.li}>Photos</li>
          <li className={classes.li}>Videos</li>
          <li className={classes.li}>Friends</li>
          <li className={classes.li}>About</li>
        </ul>
      </div>
      <Grid container spacing={2}>
        <Grid item sm={1} />
        <Grid item sm={7} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={3} xs={12}>
          {profile == null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
        <Grid item sm={1} />
      </Grid>
    </div>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(User)
);

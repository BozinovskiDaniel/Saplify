import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// Material Ui
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";

// User Page
function User(props) {
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);

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
      if (scream.screamId != screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else return <Scream key={scream.screamId} scream={scream} openDialog />;
    })
  );

  return (
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
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);

import React, { useEffect } from "react";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ShortCuts from "../components/layout/ShortCuts";
import ScreamPost from "../components/scream/ScreamPost";

// Material Ui Imports
import Grid from "@material-ui/core/Grid";

function Home(props) {
  const { screams, loading } = props.data;

  useEffect(() => {
    props.getScreams();
  }, []);

  let recentScreamsMarkup = !loading ? (
    screams.map((scream) => {
      return <Scream key={scream.screamId} scream={scream} />;
    })
  ) : (
    <ScreamSkeleton />
  );

  return (
    <Grid container spacing={3}>
      <Grid item sm={3} xs={12}>
        <ShortCuts />
      </Grid>
      <Grid item sm={6} xs={12}>
        <ScreamPost />
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={3} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);

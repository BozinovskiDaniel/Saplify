import React, { useEffect } from "react";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
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
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={1} />
      <Grid item sm={7} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={3} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={1} />
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

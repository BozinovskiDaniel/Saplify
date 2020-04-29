import React, { useEffect } from "react";
import Scream from "../components/Scream";
import Profile from "../components/Profile";
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
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
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

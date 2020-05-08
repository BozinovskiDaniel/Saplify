import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentWeather } from "../../redux/actions/dataActions";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  weatherContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

function WeatherSection(props) {
  const { classes } = props;

  useEffect(() => {
    console.log(props);
    //props.getCurrentWeather(location);
  }, []);

  let weatherMarkup = props.weather ? (
    <div className={classes.weatherContainer}>
      <p>hello</p>
    </div>
  ) : null;

  return <Fragment>{weatherMarkup}</Fragment>;
}

WeatherSection.propTypes = {
  getCurrentWeather: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  weather: state.weather,
});

export default connect(mapStateToProps, { getCurrentWeather })(
  withStyles(styles)(WeatherSection)
);

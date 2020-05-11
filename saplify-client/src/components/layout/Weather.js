import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentWeather } from "../../redux/actions/dataActions";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.spreadThis,
  weatherContainer: {
    background:
      "url(https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "inset 0 0 0 100vw rgba(44, 130, 201, 0.6)",
    borderRadius: 5,
    marginBottom: 20,
    color: "#fff",
  },
  forecast: {
    backgroundColor: "rgba(137, 196, 244, 0.85)",
    width: "100%",
  },
  weatherIcon: {
    width: "100px",
    height: "100px",
  },
});

function Weather(props) {
  useEffect(() => {
    props.getCurrentWeather("Sydney");
  }, []);

  const { classes } = props;
  const { weather } = props.data;

  let weatherMarkup =
    weather != null && Object.keys(weather).length != 0 ? (
      <Grid container className={classes.weatherContainer}>
        <Grid
          container
          item
          sm={12}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <img
            src={weather.current.condition.icon}
            alt="weather icon"
            className={classes.weatherIcon}
          />
        </Grid>
        <Grid item sm={12} style={{ padding: "40px 0" }}>
          <Grid container spacing={1}>
            <Grid item sm={3}>
              {weather.current.temp_c}°
            </Grid>
            <Grid item sm={6}>
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  {weather.current.condition.text}
                </Grid>
                <Grid item sm={12}>
                  {weather.location.name}, {weather.location.region}
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={3}>
              date
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} className={classes.forecast}>
          <p>hello</p>
        </Grid>
        <Grid item sm={12} />
      </Grid>
    ) : null;

  return <Fragment>{weatherMarkup}</Fragment>;
}

Weather.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  weather: state.weather,
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getCurrentWeather })(
  withStyles(styles)(Weather)
);

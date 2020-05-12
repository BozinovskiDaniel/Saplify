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
    boxShadow: "inset 0 0 0 100vw rgba(44, 130, 201, 0.7)",
    borderRadius: 5,
    marginBottom: 20,
    color: "#fff",
  },
  forecast: {
    backgroundColor: "rgba(137, 196, 244, 0.85)",
    width: "100%",
    marginBottom: 35,
  },
  forecastDay: {
    padding: "5px 30px",
  },
  weatherIcon: {
    width: "100px",
    height: "100px",
  },
  weatherDate: {
    borderRadius: "15px 0 0 15px",
    backgroundColor: "rgba(50,205,50, 0.8)",
  },
});

var month = new Array();
month[0] = "JAN";
month[1] = "FEB";
month[2] = "MAR";
month[3] = "APR";
month[4] = "MAY";
month[5] = "JUN";
month[6] = "JUL";
month[7] = "AUG";
month[8] = "SEP";
month[9] = "OCT";
month[10] = "NOV";
month[11] = "DEC";

var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

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
          alignItems="flex-end"
          style={{ padding: "20px 0 0 0" }}
        >
          <img
            src={weather.current.condition.icon}
            alt="weather icon"
            className={classes.weatherIcon}
          />
        </Grid>
        <Grid item sm={12} style={{ padding: "40px 0" }}>
          <Grid container>
            <Grid item sm={1} />
            <Grid item sm={8}>
              <Grid container spacing={1}>
                <Grid container item sm={12}>
                  <Typography variant="h4">
                    {weather.current.temp_c}°
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography variant="h5">
                    {weather.current.condition.text}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography variant="h7">
                    {weather.location.name}, {weather.location.region}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item sm={3} className={classes.weatherDate}>
              <Grid
                item
                sm={12}
                container
                direction="row"
                justify="center"
                alignItems="flex-end"
              >
                <Typography variant="h6">
                  {month[new Date().getMonth()]}
                </Typography>
              </Grid>
              <Grid
                item
                sm={12}
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Typography variant="h5">
                  <b>{new Date().getDate()}</b>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          className={classes.forecast}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {weather.forecast.forecastday.map((day, index) => {
            return (
              <Grid item className={classes.forecastDay}>
                <Grid item sm={12}>
                  <Typography variant="body2">
                    <b>{weekday[new Date().getDay() + index + 1]}</b>
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <img
                    src={day.day.condition.icon}
                    width="35px"
                    height="35px"
                  />
                </Grid>
                <Grid item sm={12}>
                  <Typography variant="body2">{day.day.avgtemp_c}°</Typography>
                </Grid>
              </Grid>
            );
          })}
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

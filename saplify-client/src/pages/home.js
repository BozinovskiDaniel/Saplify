import React, { useState, useEffect } from "react";
import axios from "axios";
import Scream from "../components/Scream";
import Profile from "../components/Profile";

// Material Ui Imports
import Grid from "@material-ui/core/Grid";

export default function Home() {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    axios
      .get("/screams")
      .then((res) => {
        setScreams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let recentScreamsMarkup = screams ? (
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

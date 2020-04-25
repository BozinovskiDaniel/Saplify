import React, { useState, useEffect } from "react";
import axios from "axios";

// Material Ui Imports
import Grid from "@material-ui/core/Grid";

export default function Home() {
  const { screams, setScreams } = useState(null);

  useEffect(() => {
    axios
      .get("/screams")
      .then((res) => {
        console.log(res);
        setScreams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let recentScreamsMarkup = screams ? (
    screams.map((scream) => {
      <p>{scream.body}</p>;
    })
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile.....</p>
      </Grid>
    </Grid>
  );
}

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import { getUserData } from "../redux/actions/dataActions";

// Material Ui
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";

function User(props) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const handle = props.match.params.handle;
    const { screams, loading } = props.data;

    props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div></div>;
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);

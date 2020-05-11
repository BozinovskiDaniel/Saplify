import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  coverImage: {
    boxShadow: "inset 0 0 0 100vw rgba(0,0,0,0.25)",
    width: "100%",
    height: "45vh",
  },
  insideCover: {
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
  editCoverPhotoBtn: {
    left: "24%",
    top: "80%",
    color: "#eee",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    fontSize: 12,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  },
  addFriendBtn: {
    left: "70%",
    top: "80%",
    backgroundColor: theme.palette.primary.main,
    color: "#eee",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.0)",
      outline: "0.5px solid #32CD32",
    },
  },
  selectionBar: {
    height: "9vh",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    position: "relative",
  },
  ul: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-30%)",
  },
  li: {
    display: "inline",
    padding: "5px 30px",
    top: "100px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  navtitle: {
    display: "inline",
    paddingRight: "80px",
    paddingLeft: "20px",
    fontSize: "35px",
    fontWeight: "700",
    color: theme.palette.primary.light,
  },
  navImageContainer: {
    position: "absolute",
    zIndex: 1,
    left: "9%",
    bottom: "60%",
  },
  navImage: {
    borderRadius: "50%",
    height: 185,
    width: 185,
    border: "6px solid #eee",
    objectFit: "cover",
  },
});

function TopSection(props) {
  const {
    classes,
    user: {
      credentials: { coverPhotoUrl },
      authenticated,
    },
    profile,
  } = props;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    console.log(image.name);

    // Send to the server
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadCoverImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  return (
    <Fragment>
      <div
        className={classes.coverImage}
        style={{
          background: `url(${coverPhotoUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={classes.insideCover}>
          {profile && authenticated ? (
            profile.handle === props.user.credentials.handle ? (
              <Button
                variant="contained"
                className={classes.editCoverPhotoBtn}
                onClick={handleEditPicture}
              >
                <CameraAltIcon style={{ paddingRight: "10px" }} />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={handleImageChange}
                />
                Edit Cover Photo
              </Button>
            ) : null
          ) : null}
          {profile && authenticated ? (
            profile.handle !== props.user.credentials.handle ? (
              <Button variant="contained" className={classes.addFriendBtn}>
                Add Friend
              </Button>
            ) : null
          ) : null}
        </div>
      </div>
      <div className={classes.selectionBar}>
        <ul className={classes.ul}>
          <li className={classes.navImageContainer}>
            {profile ? (
              <img
                src={profile.imageUrl}
                alt="profile image"
                className={classes.navImage}
              />
            ) : null}
          </li>
          <li className={classes.navtitle}>
            {profile ? profile.handle : null}
          </li>
          <li className={classes.li}>Timeline</li>
          <li className={classes.li}>Photos</li>
          <li className={classes.li}>Friends</li>
          <li className={classes.li}>About</li>
        </ul>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(TopSection));

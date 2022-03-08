import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CircularIndeterminate from "./CircularIndeterminate";
import "../App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 14,
  color: "white",
  backgroundColor: "black",
};

export default function TransitionsModal({
  open,
  onClose,
  movieID,
  handleFavoritesClick,
  handleRemovingFavorites,
  handleClose,
  player,
  checkFavorites,
}) {
  const [bigInfo, setBigInfo] = useState("");

  const getMovieInfo = async (movieID) => {
    let URL = `http://www.omdbapi.com/?i=${movieID}&apikey=1f1007f0`;
    const response = await fetch(URL);
    const data = await response.json();
    setBigInfo(data);
  };

  useEffect(() => {
    getMovieInfo(movieID);
  }, [movieID]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {movieID === null ? (
              <CircularIndeterminate></CircularIndeterminate>
            ) : (
              <>
                <iframe
                  className="yt"
                  width={371}
                  height={400}
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${player}`}
                />
                <Typography
                  align="center"
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                >
                  {bigInfo.Title}
                </Typography>
                <Typography
                  align="center"
                  id="transition-modal-description"
                  sx={{ mt: 2 }}
                >
                  Genre: {bigInfo.Genre}
                </Typography>
                <Typography
                  align="center"
                  id="transition-modal-description"
                  sx={{ mt: 2 }}
                >
                  Release Date: {bigInfo.Released}
                </Typography>
                <Typography
                  align="center"
                  id="transition-modal-description"
                  sx={{ mt: 2 }}
                >
                  Runtime:{bigInfo.Runtime}
                </Typography>
                <Typography
                  align="center"
                  id="transition-modal-description"
                  sx={{ mt: 2 }}
                >
                  Rating: {bigInfo.imdbRating}
                </Typography>
                <Typography
                  align="center"
                  id="transition-modal-description"
                  sx={{ mt: 2 }}
                >
                  {bigInfo.Plot}
                </Typography>
                {checkFavorites
                  .map((fav) => fav.imdbID === bigInfo.imdbID)
                  .some((el) => el === true) ? (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      handleRemovingFavorites(bigInfo);
                      handleClose();
                    }}
                  >
                    Remove from favorites!
                  </button>
                ) : (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      handleFavoritesClick(bigInfo);
                      handleClose();
                    }}
                  >
                    Add to favorites!
                  </button>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

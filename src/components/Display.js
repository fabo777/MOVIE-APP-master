import React, { useState } from "react";
import youtube from "./youtube";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TransitionsModal from "./TransitionsModal";
import "../App.css";

export default function Display({
  movies,
  handleFavoritesClick,
  handleRemovingFavorites,
  checkFavorites,
}) {
  const [open, setOpen] = useState(false);
  const [movieID, setMovieID] = useState(null);
  const [player, setPlayer] = useState(null);

  const videoPlayer = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term + "trailer",
      },
    });
    setPlayer(response.data.items[0].id.videoId);
  };

  const handleOpen = (index) => {
    setMovieID(movies[index].imdbID);
    videoPlayer(movies[index].Title);
    setTimeout(() => {
      setOpen(true);
    }, 300);
  };
  const handleClose = () => {
    setOpen(false);
    setMovieID(null);
  };

  return movies.length === 0 ? (
    <div className="backgroundImg"></div>
  ) : (
    <>
      <Box
        className="displayBox"
        sx={{
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 350,
            height: 420,
          },
        }}
      >
        {movies.map((movie, index) => {
          if (movie.Type === "movie")
            return (
              <Paper
                className="paper"
                onClick={() => handleOpen(index)}
                style={{
                  backgroundImage: `url(${
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "url(/images/home.jpg)"
                  })`,
                }}
                elevation={6}
                key={movie.imdbID}
              />
            );
        })}
      </Box>

      <TransitionsModal
        checkFavorites={checkFavorites}
        open={open}
        onClose={handleClose}
        movieID={movieID}
        handleFavoritesClick={handleFavoritesClick}
        handleRemovingFavorites={handleRemovingFavorites}
        handleClose={handleClose}
        player={player}
      />
    </>
  );
}

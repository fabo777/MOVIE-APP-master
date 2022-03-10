import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Display from "./components/Display";
import Header from "./components/Header";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const noDisplay = () => {
    setMovies([]);
    setSearchValue("");
  };

  const getMovieRequest = async (searchValue) => {
    let URL = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(URL);
    const data = await response.json();

    if (data.Search) setMovies(data.Search);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue, favorites]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("movie-app-favorites")
    );
    setFavorites(movieFavorites || []);
  }, []);

  const addFavoritesMovie = (movie) => {
    const newFavoritesList = [...favorites, movie];
    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  };

  const removeFavoritesMovie = (movie) => {
    const newFavoritesList = favorites.filter((e) => e.imdbID !== movie.imdbID);
    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-app-favorites", JSON.stringify(items));
  };

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route
            path="/"
            exact
            element={
              <>
                <Header
                  setMovies={setMovies}
                  setSearchValue={setSearchValue}
                  noDisplay={noDisplay}
                  onFavorites={false}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                />
                <div className="homeImg"></div>
              </>
            }
          />
          <Route
            path="/home"
            exact
            element={
              <>
                <Header
                  setMovies={setMovies}
                  setSearchValue={setSearchValue}
                  noDisplay={noDisplay}
                  onFavorites={false}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                />
                <Display
                  movies={movies}
                  handleFavoritesClick={addFavoritesMovie}
                  handleRemovingFavorites={removeFavoritesMovie}
                  checkFavorites={favorites}
                />
              </>
            }
          />
          <Route
            path="/favorites"
            exact
            element={
              <>
                <Header
                  setMovies={setMovies}
                  setSearchValue={setSearchValue}
                  noDisplay={noDisplay}
                  onFavorites={true}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                />
                <Display
                  movies={favorites}
                  handleRemovingFavorites={removeFavoritesMovie}
                  checkFavorites={favorites}
                />
              </>
            }
          />
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

{
  /* <BrowserRouter>
<Routes>
  <>
    <Route
      path="/"
      exact
      element={
        <>
          <Header
            setMovies={setMovies}
            setSearchValue={setSearchValue}
            noDisplay={noDisplay}
            onFavorites={false}
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
          />
          <div className="homeImg"></div>
        </>
      }
    />
    <Route
      path="/home"
      exact
      element={
        <>
          <Header
            setMovies={setMovies}
            setSearchValue={setSearchValue}
            noDisplay={noDisplay}
            onFavorites={false}
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
          />
          <Display
            movies={movies}
            handleFavoritesClick={addFavoritesMovie}
            handleRemovingFavorites={removeFavoritesMovie}
            checkFavorites={favorites}
          />
        </>
      }
    />
    <Route
      path="/favorites"
      exact
      element={
        <>
          <Header
            setMovies={setMovies}
            setSearchValue={setSearchValue}
            noDisplay={noDisplay}
            onFavorites={true}
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
          />
          <Display
            movies={favorites}
            handleRemovingFavorites={removeFavoritesMovie}
            checkFavorites={favorites}
          />
        </>
      }
    />
  </>
</Routes>
</BrowserRouter> */
}

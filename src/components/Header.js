import React from "react";
import GoogleAuth from "./GoogleAuth";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "../App.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
    },
  },
}));
const Header = ({
  setMovies,
  onFavorites,
  isSignedIn,
  setIsSignedIn,
  noDisplay,
  setSearchValue,
  value,
}) => {
  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0 }}>
      <AppBar position="static">
        <Toolbar>
          {isSignedIn === true ? (
            <>
              <Typography
                style={{ fontWeight: 600 }}
                variant="h5"
                noWrap
                component="div"
                sx={{
                  fontSize: 30,
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Make Your Watch List!
              </Typography>
              <Link className="link" onClick={noDisplay} to="/home">
                Home
              </Link>
              <Link className="link" to="/favorites">
                Favorites
              </Link>
              {onFavorites === false ? (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    value={value}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search for a movie"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              ) : (
                <div> </div>
              )}
              <GoogleAuth
                setMovies={setMovies}
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
              />
            </>
          ) : (
            <>
              <Typography
                style={{ fontWeight: 600 }}
                variant="h4"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  width: " 100%",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Sign in to continue!
              </Typography>
              <GoogleAuth
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

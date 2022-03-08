import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GoogleAuth = ({ isSignedIn, setIsSignedIn, setMovies }) => {
  const [googleObj, setGoogleObj] = useState({});

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: `${process.env.REACT_APP_GOOGLE_KEY}`,
          scope: "email",
        })
        .then(() => {
          let auth = window.gapi.auth2.getAuthInstance();
          setGoogleObj(auth);
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(() => {
            setIsSignedIn(auth.isSignedIn.get());
          });
        });
    });
  }, []);

  const onSignIn = () => {
    googleObj.signIn();
  };

  const onSignOut = () => {
    googleObj.signOut();
    setMovies([]);
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <Link
          style={{ marginLeft: 10 }}
          to="/"
          onClick={onSignOut}
          className="ui red google button"
        >
          <i className="google icon" />
          Sign Out
        </Link>
      );
    } else {
      return (
        <Link to="/home" onClick={onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </Link>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;

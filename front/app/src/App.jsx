import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CommonLayout from "./components/layouts/CommonLayout";
import Home from "components/pages/Home";
import SignUp from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";

import { getCurrentUser } from "lib/api/auth";

export const AuthContext = createContext({
  loading: true,
  setLoading: () => {},
  isSignedIn: false,
  setIsSignedIn: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.currentUser);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Navigate replace to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Private><Home /></Private>} />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./MainApp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isLoggedIn } from "./store/thunks/user";
import Nav from "./components/nav/Nav";
import Player from "./components/player/Player";
import App from "./components/app/App";
import Artist from "./components/app/Artist/Artist";

function MainApp() {
  const [loading, setLoading] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  useEffect(() => {
    if (user.auth === true) {
      setLoading(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="main-app">
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/artist/:id"
            element={
              <App>
                <Artist />
              </App>
            }
          />
        </Routes>
        <Player />
      </div>
      {/*<Routes>*/}
      {/*  <Route path="/login" element={<Login />} />*/}
      {/*  <Route path="/signup" element={<Signup />} />*/}
      {/*</Routes>*/}
    </BrowserRouter>
  );
}

export default MainApp;

import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Header from "./components/HOC/Header";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

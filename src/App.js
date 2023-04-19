import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import  Favourites  from "./components/Favourites";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Banner />
              <Movies />
            </div>
          }
        ></Route>
        <Route path="/favourites" element=<Favourites /> ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

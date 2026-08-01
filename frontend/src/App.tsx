import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
// import Register from "./components/Register";
// import MovieDetails from "./components/MovieDetails";
// import Favorites from "./components/Favorites";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path="/register" element={<Register />} /> */}

        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
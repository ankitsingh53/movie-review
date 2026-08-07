import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MovieDetails from "./components/MovieDetails";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/ForgotPassword";
import Favorites from "./components/Favorites";
import NoPageFound from "./components/NoPageFound";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="*" element={<NoPageFound/>} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
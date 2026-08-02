import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/apiService";
import { toast } from "react-toastify";

interface NavbarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setSearchResults, setIsSearching }: NavbarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = async () => {
    try {
      const response = await api.post("/user/logout");
      navigate("/");
      toast.success(`${response.data.message}`,{
        "autoClose": 2000
      })
    } catch (error) {
      
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setIsSearching(false);
      return;
    }

    try {
      const response = await api.get(`/movies/search?query=${query}`);
      console.log(response.data.data)

      setSearchResults(response.data.data);
      setIsSearching(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#121212",
        boxShadow: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}

        <Typography
          component={Link}
          to="/home"
          variant="h5"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🎬 Movie Review
        </Typography>

        <TextField
          size="small"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          sx={{
            width: 350,
            bgcolor: "white",
            borderRadius: 1,
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleSearch}
                  />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Right Side */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button component={Link} to="/home" color="inherit">
            Home
          </Button>

          <Button component={Link} to="/favorites" color="inherit">
            Favorites
          </Button>

          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

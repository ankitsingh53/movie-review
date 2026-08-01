import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // We'll connect backend later
    localStorage.removeItem("user");
    navigate("/");
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

        {/* Right Side */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            component={Link}
            to="/home"
            color="inherit"
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/favorites"
            color="inherit"
          >
            Favorites
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

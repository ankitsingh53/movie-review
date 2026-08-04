import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/apiService";
import { toast } from "react-toastify";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import axios from "axios";

interface InputProps {
  user: {
    id: string;
    name: string;
  }
}


const Navbar = (props:InputProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post("/user/logout");
      navigate("/");
      toast.success(`${response.data.message}`, {
        autoClose: 2000,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          autoClose: 2000,
        });
      }
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
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LiveTvIcon sx={{ fontSize: "50px", color: "red" }} />
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
            Movie Review
          </Typography>
        </Box>

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

          {!props.user ? (<Button variant="contained" color="primary" onClick={()=>navigate("/")}>
            Login
          </Button>):(<Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>)}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

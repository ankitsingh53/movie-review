import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  return (
    <Box
      sx={{
        bgcolor: "#121212",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: 420,
          bgcolor: "#1E1E1E",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 45,
            textAlign: "center",
            mb: 1,
          }}
        >
          🎬
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Movie Review
        </Typography>

        <Typography
          sx={{
            color: "gray",
            textAlign: "center",
            mb: 4,
          }}
        >
          Welcome Back
        </Typography>

        <Typography
          sx={{
            color: "white",
            mb: 1,
          }}
        >
          Email
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter your email"
          sx={{
            mb: 3,
            bgcolor: "white",
            borderRadius: 1,
          }}
        />

        <Typography
          sx={{
            color: "white",
            mb: 1,
          }}
        >
          Password
        </Typography>

        <TextField
          fullWidth
          type="password"
          placeholder="Enter your password"
          sx={{
            bgcolor: "white",
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            mb: 4,
          }}
        >
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            color="#90CAF9"
          >
            Register
          </Link>

          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="hover"
            color="#90CAF9"
          >
            Forgot Password?
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            fontWeight: "bold",
            borderRadius: 2,
          }}
        >
          Login
        </Button>

        <Typography
          sx={{
            color: "gray",
            textAlign: "center",
            mt: 4,
            fontSize: 14,
          }}
        >
          © 2026 Movie Review Application
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
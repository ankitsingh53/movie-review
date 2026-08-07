import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/apiService";
import { toast } from "react-toastify";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import axios from "axios";

type FormData = {
  name: string;
  email: string;
  password: string;
};

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const customeValidate = () => {
    const formErrors: FormErrors = {};
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    const stringPattern = /^[A-Za-z\s'-]+$/;

    if (!formData.name.trim() || !formData.name) {
      formErrors.name = "Name is required";
      isValid = false;
    } else if (!stringPattern.test(formData.name)) {
      formErrors.name = "Only Characters are allowed";
      isValid = false;
    } else if (formData.name.length < 3) {
      formErrors.name = "Name cannot be less than 3 characters";
      isValid = false;
    }
    if (!formData.email.trim() || !formData.email) {
      formErrors.email = "Email is mandatory";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Enter valid email address and must include @";
      isValid = false;
    }
    if (!formData.password.trim() || !formData.password) {
      formErrors.password = "Password is mandatory";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      formErrors.password =
        "Password must be minimum 4 characters, one letter & one digit";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = customeValidate();
    if (!valid) return;
    try {
      await api.post("/user/register", formData);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
      toast.success("Registered Successfully", {
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
    <Box
      sx={{
        bgcolor: "#1d1d1d",
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
          width: 450,
          bgcolor: "#272727",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="On"
          onSubmit={handleSubmit}
        >
          <Typography
            sx={{
              fontSize: 45,
              textAlign: "center",
              mb: 1,
            }}
          >
            <LiveTvIcon sx={{ fontSize: "100px", color: "red" }} />
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Movie Review App
          </Typography>

          <Typography
            sx={{
              color: "gray",
              textAlign: "center",
              mb: 4,
            }}
          >
            Create your account to continue.
          </Typography>

          <Typography
            sx={{
              color: "white",
              mb: 1,
            }}
          >
            Full Name
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter your fullname"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="on"
            sx={{
              mb: 3,
              bgcolor: "#ececec",
              borderRadius: 1,
            }}
          />

          {errors && (
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block", color: "#FF6B6B" }}
            >
              {errors.name}
            </Typography>
          )}

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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              mb: 3,
              bgcolor: "#ececec",
              borderRadius: 1,
            }}
          />
          {errors && (
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block", color: "#FF6B6B" }}
            >
              {errors.email}
            </Typography>
          )}

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
            type={showCurrent ? "text" : "password"}
            margin="normal"
            name="password"
            onChange={handleChange}
            value={formData.password}
            autoComplete="on"
            placeholder="Enter your password"
            sx={{
              mb: 3,
              bgcolor: "#ececec",
              borderRadius: 1,
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrent(!showCurrent)}
                      edge="end"
                    >
                      {showCurrent ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {errors && (
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block", color: "#FF6B6B" }}
            >
              {errors.password}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              marginTop: "40px",
            }}
          >
            Register
          </Button>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            mt: 3,
            color: "white",
          }}
        >
          Already have an account?{" "}
          <Link component="button" onClick={() => navigate("/")}>
            Login
          </Link>
        </Typography>

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

export default Register;

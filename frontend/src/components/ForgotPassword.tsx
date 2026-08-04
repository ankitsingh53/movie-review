import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import api from "../axios/apiService";
import axios from "axios";

interface FormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}
interface FormError {
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormError>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const customeValidate = () => {
    const formErrors: FormError = {};
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!formData.email.trim()) {
      formErrors.email = "Email is mandatory";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Enter valid email address and must include @";
      isValid = false;
    }
    if (!formData.newPassword.trim()) {
      formErrors.newPassword = "New Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.newPassword)) {
      formErrors.newPassword =
        "Password must be minimum 4 characters, one letter & one digit";
      isValid = false;
    }
    if (!formData.confirmPassword.trim()) {
      formErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords does not match";
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
      await api.post("/user/forgotpassword", {
        email: formData.email,
        password: formData.newPassword
      });

      setFormData({
        email: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password Changed Successfully");
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          margin: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 420,
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Typography
              sx={{
                fontSize: "34px",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Forgot Password
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Change your password
            </Typography>

            <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>

            <TextField
              fullWidth
              placeholder="Enter your email"
              sx={{ mb: 2 }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="on"
            />
            {errors && (
              <Typography
                variant="overline"
                gutterBottom
                sx={{ display: "block", color: "red" }}
              >
                {errors.email}
              </Typography>
            )}

            <Typography sx={{ mb: 1, fontWeight: 500 }}>
              New Password
            </Typography>

            <TextField
              fullWidth
              type={showCurrent ? "text" : "password"}
              sx={{ mb: 2 }}
              placeholder="Enter your password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              autoComplete="on"
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
                sx={{ display: "block", color: "red" }}
              >
                {errors.newPassword}
              </Typography>
            )}

            <Typography sx={{ mb: 1, fontWeight: 500 }}>
              Confirm Password
            </Typography>

            <TextField
              fullWidth
              sx={{ mb: 2 }}
              type={showCurrent ? "text" : "password"}
              placeholder="Enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="on"
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
                sx={{ display: "block", color: "red" }}
              >
                {errors.confirmPassword}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 4,
                py: 1.5,
                bgcolor: "#131B63",
                borderRadius: 2,
              }}
            >
              Change Password
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 5,
              textAlign: "center",
              color: "gray",
            }}
          >
            © 2026 Movie Review Application
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

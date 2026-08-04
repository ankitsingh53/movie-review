import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Paper, TextField, Typography, Link, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/apiService";
import { toast } from "react-toastify";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { isAxiosError } from "axios";

type FormData = {
  email: string;
  password: string;
};

interface FormErrors {
  email?: string;
  password?: string;
}

const Register = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
   const [showCurrent, setShowCurrent] = useState(false);
   const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
    setErrors({ ...errors, [e.target.name]: "" });
  }

  const customeValidate = () => {
    const formErrors: FormErrors = {};
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    if (!formData.email.trim() || !formData.email ) {
      formErrors.email = "Email is mandatory";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Enter valid email address and must include @";
      isValid = false;
    }
    if (!formData.password.trim() || !formData.password ) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const valid = customeValidate();
    if(!valid) return;
    try {
        const data = await api.post('/user/login', formData);
        
        console.log(data)

        setFormData({
          email: "",
          password: "",
        });
        navigate('/home')
        toast.success("Login Successfully", {
          autoClose: 2000,
        });
    } catch (error:unknown) {
        if(isAxiosError(error)){
          toast.error(error.response?.data.message , {
          autoClose: 2000,
        });
        }
    }
  }
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
        <Box component="form" noValidate autoComplete="On" onSubmit={handleSubmit}>
          <Typography
            sx={{
              fontSize: 45,
              textAlign: "center",
              mb: 1,
            }}
          >
          <LiveTvIcon sx={{fontSize: '100px', color: 'red'}}/>
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
                sx={{ display: "block", color: "#FF6B6B"  }}
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
                sx={{ display: "block", color: "#FF6B6B"  }}
              >
                {errors.password}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Link
                component="button"
                underline="hover"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Link>
            </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              marginTop: '40px'
            }}
          >
            Login
          </Button>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            mt: 3,
            color: 'white'
          }}
        >
          Don't have an account ? {" "}
          <Link component="button" onClick={() => navigate("/register")}>
            Sign Up
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

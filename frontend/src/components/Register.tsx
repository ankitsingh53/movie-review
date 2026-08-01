// import {
//   Box,
//   Button,
//   CircularProgress,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// // import { registerUser } from "../services/authApi";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const response = await registerUser(formData);

//       alert(response.message);

//       navigate("/");
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Registration Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#121212",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           width: 420,
//           p: 4,
//           bgcolor: "#1E1E1E",
//           borderRadius: 2,
//         }}
//       >
//         <Typography
//           variant="h4"
//           textAlign="center"
//           color="white"
//           fontWeight="bold"
//           mb={1}
//         >
//           🎬 Movie Review
//         </Typography>

//         <Typography
//           variant="h6"
//           textAlign="center"
//           color="white"
//           mb={3}
//         >
//           Create Account
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleRegister}
//         >
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             margin="normal"
//             value={formData.name}
//             onChange={handleChange}
//             InputLabelProps={{
//               sx: { color: "#BDBDBD" },
//             }}
//             InputProps={{
//               sx: {
//                 color: "white",
//               },
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "#555",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "#1976d2",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#1976d2",
//                 },
//               },
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             margin="normal"
//             value={formData.email}
//             onChange={handleChange}
//             InputLabelProps={{
//               sx: { color: "#BDBDBD" },
//             }}
//             InputProps={{
//               sx: {
//                 color: "white",
//               },
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "#555",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "#1976d2",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#1976d2",
//                 },
//               },
//             }}
//           />

//           <TextField
//             fullWidth
//             type="password"
//             label="Password"
//             name="password"
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//             InputLabelProps={{
//               sx: { color: "#BDBDBD" },
//             }}
//             InputProps={{
//               sx: {
//                 color: "white",
//               },
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "#555",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "#1976d2",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#1976d2",
//                 },
//               },
//             }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             type="submit"
//             sx={{
//               mt: 3,
//               height: 45,
//             }}
//             disabled={loading}
//           >
//             {loading ? (
//               <CircularProgress
//                 size={22}
//                 color="inherit"
//               />
//             ) : (
//               "Register"
//             )}
//           </Button>
//         </Box>

//         <Typography
//           textAlign="center"
//           color="white"
//           mt={3}
//         >
//           Already have an account?
//           <Button
//             component={Link}
//             to="/"
//           >
//             Login
//           </Button>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default Register;
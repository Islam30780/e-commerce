import React, { useState } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { loginSchema } from "../validation/authSchemas"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit,formState: { errors ,isSubmitting }, } = useForm({
    resolver: yupResolver(loginSchema), mode: "onBlur"
  })
  const onSubmit = async (data) => {
  console.log("Sending:", data);

  try {
    const response = await axios.post(
      "https://knowledgeshop.runasp.net/api/auth/Account/Login",
      data
    );

    console.log("Response:", response.data);

  } catch (error) {
    console.error("Login Error:", error);
    setServerError("Login failed. Please check your credentials.");
  }
};
  return (
    <Container maxWidth="sm" >
      <Box sx={{ bgcolor: "white", boxShadow: 3, borderRadius: 2, p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {serverError ? <Alert severity="error">{serverError}</Alert>:null}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Email" fullWidth margin='normal'{...register("email", { required: true })} helperText={errors.email?.message} ></TextField>
          <TextField label="Password" fullWidth margin='normal' type="password" {...register("password", { required: true })} helperText={errors.password?.message} ></TextField>
          <Button type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
             disabled={isSubmitting}
          >
            
           {isSubmitting?"Logging in...":"Login"}
          </Button>
          
          
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

import React, { useState } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { registerSchema } from "../validation/authSchemas"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';


export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [success , setSuccess] = useState(false);
  const { register, handleSubmit,formState: { errors ,isSubmitting }, } = useForm({
    resolver: yupResolver(registerSchema), mode: "onBlur"
  })      
  const onSubmit  = async (data) => {
      console.log(data);
      try {
        const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Register', data);
        setSuccess(true);
        navigate('/login');
      } catch (error) {
        console.error(error);
        setServerError("Registration failed. Please try again.");
      }
  }
  return (
    <Container maxWidth="sm" >
      <Box sx={{ bgcolor: "white", boxShadow: 3, borderRadius: 2, p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>
        {serverError ? <Alert severity="error">{serverError}</Alert>:null}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} >
          <TextField
            label="Full Name"
            fullWidth
            margin='normal'
            {...register("fullName", { required: true })}
            helperText={errors.fullName?.message}
          ></TextField>
          <TextField label="Email" fullWidth margin='normal' {...register("email", { required: true })} helperText={errors.email?.message}></TextField>
          <TextField label="Password" fullWidth margin='normal' type="password" {...register("password", { required: true })} helperText={errors.password?.message}></TextField>
          <TextField label="User Name" fullWidth margin='normal' {...register("userName", { required: true })} helperText={errors.userName?.message}></TextField>
          <TextField label="Phone Number" fullWidth margin='normal'  {...register("phoneNumber", { required: true })} helperText={errors.phoneNumber?.message}></TextField>
          <Button type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            Register
            {isSubmitting?"Loading...":"Register"} 
          </Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
              Already have an account? Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
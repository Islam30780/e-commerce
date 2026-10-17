import React, { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [serverError, setServerError] = useState(null);

  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Data:", data);
    console.log("Email:", email);

    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/auth/Account/ResetPassword",
        {
          code: data.code,
          newPassword: data.newPassword,
          email: email,
        }
      );

      console.log("Response:", response.data);

      navigate("/login");

    } catch (error) {
      console.log("ERROR:", error.response?.data);

      setServerError(
        error.response?.data?.message ||
        "Failed to reset password."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          mt: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          gutterBottom
        >
          Reset Password
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Verification Code"
            fullWidth
            margin="normal"
            {...register("code", {
              required: "Code is required",
            })}
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("newPassword", {
              required: "Password is required",
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
import React, { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { forgotPasswordSchema } from "../validation/authSchemas";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log("Sending:", data);

    setServerError(null);

    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/auth/Account/SendCode",
        {
          email: data.email,
        }
      );

      console.log("Send Code Response:", response.data);

      navigate("/reset-password", {
        state: {
          email: data.email,
        },
      });

    } catch (error) {
      console.log("Send Code Error:", error.response?.data);

      setServerError(
        error.response?.data?.message ||
          "Failed to send verification code. Please try again."
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
          Forgot Password
        </Typography>

        <Typography variant="body1" align="center">
          Enter your email and we will send you a verification code.
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Sending..."
              : "Send Verification Code"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
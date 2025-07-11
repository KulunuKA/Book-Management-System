"use client";

import React, { useState } from "react";
import { Box, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import CustomButton from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import styles from "../style.module.css";
import Input from "@/components/ui/Input";
import { LOGIN_USER } from "@/graphql/user/mutation";
import { useMutation } from "@apollo/client";
import Link from "next/link";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const router = useRouter();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setServerError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { data } = await loginUser({
          variables: {
            createUserInput: {
              email: formData.email,
              password: formData.password,
            },
          },
        });

        if (data.loginUser.token) {
          sessionStorage.setItem("TKN", data.loginUser.token);
        }
        // navigate to book list page
        router.push("/book-list");
      } catch (error) {
        console.error(error);
        setServerError(
          error?.graphQLErrors?.[0]?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Book Management Login
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ my: 2 }}>
            {serverError}
          </Alert>
        )}

        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <Box sx={{ mt: 2 }}>
          <CustomButton
            name={
              loading ? <CircularProgress size={20} color="inherit" /> : "Login"
            }
            type="submit"
            disabled={loading}
          />
        </Box>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            href="/register"
            underline="hover"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
          >
            Register
          </Link>
        </Typography>
      </form>
    </div>
  );
}

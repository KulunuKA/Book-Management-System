"use client";

import React, { useState } from "react";
import { Typography, Alert, Box, CircularProgress, Link } from "@mui/material";
import CustomButton from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import styles from "../style.module.css";
import Input from "@/components/ui/Input";
import { CREATE_USER } from "@/graphql/user/mutation";
import { useMutation } from "@apollo/client";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const router = useRouter();

  const [createUser, { loading }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setServerError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { data } = await createUser({
          variables: {
            createUserInput: {
              email: formData.email,
              password: formData.password,
            },
          },
        });

        if (data.createUser.token) {
          sessionStorage.setItem("TKN", data.createUser.token);
        }
        router.push("/book-list");
      } catch (error) {
        console.error(error);
        setServerError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Book Management Register
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ my: 2 }}>
            {serverError}
          </Alert>
        )}

        <Input
          label="email"
          name="email"
          type="email"
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
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Register"
              )
            }
            type="submit"
            disabled={loading}
          />
        </Box>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            underline="hover"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </Link>
        </Typography>
      </form>
    </div>
  );
}

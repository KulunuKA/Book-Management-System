"use client";
import React, { useState } from "react";
import { Typography, Paper } from "@mui/material";
import CustomButton from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import styles from "../style.module.css";
import Input from "@/components/ui/Input";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login success", formData);
      router.push("/dashboard"); // or your home page
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Book Management Register
        </Typography>

        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
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

        <CustomButton name="Login" type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

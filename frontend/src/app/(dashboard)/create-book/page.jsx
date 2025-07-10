"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Button,
  Paper,
  AppBar,
} from "@mui/material";
import Input from "@/components/ui/Input";
import App from "next/app";
import CustomButton from "@/components/ui/Button";

const genres = [
  "Fiction",
  "Non-fiction",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "Romance",
  "Other",
];

export default function CreateBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.author) newErrors.author = "Author is required";
    if (!formData.year) newErrors.year = "Published year is required";
    else if (!/^\d{4}$/.test(formData.year))
      newErrors.year = "Enter a valid year (e.g., 2021)";
    if (!formData.genre) newErrors.genre = "Genre is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted ✅", formData);
      // TODO: send to backend
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh", p: 4 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#F9FAFB",
          borderBottom: "1px solid #E5E7EB",
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            py: 2,
            color: "#111827",
            fontWeight: 600,
            fontSize: "1.25rem",
          }}
        >
          Create New Book
        </Typography>
      </AppBar>

      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
          <Input
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            error={Boolean(errors.author)}
            helperText={errors.author}
          />
          <Input
            label="Published Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            error={Boolean(errors.year)}
            helperText={errors.year}
          />
          <Input
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            error={Boolean(errors.genre)}
            helperText={errors.genre}
          />
          <Box textAlign="center" mt={2}>
            <CustomButton name="Create Book" onClick={handleSubmit} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

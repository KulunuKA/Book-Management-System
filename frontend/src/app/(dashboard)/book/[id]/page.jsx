"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Paper,
  AppBar,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/Button";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_BOOK } from "@/graphql/books/mutation";
import { GET_BOOK_BY_ID } from "@/graphql/books/queries";
import { useRouter } from "next/navigation";

const genres = [
  "Fiction",
  "Non-fiction",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "Romance",
  "Other",
];

export default function UpdateBook({ params }) {
  const token = sessionStorage.getItem("TKN");
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null;

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (data?.book) {
      const book = data.book;
      setFormData({
        id: book.id,
        title: book.title,
        author: book.author,
        publishedDate: book.publishedDate,
        genre: book.genre,
      });
    }
  }, [data]);

  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.author) newErrors.author = "Author is required";
    if (!formData.publishedDate)
      newErrors.publishedDate = "Published date is required";
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.publishedDate)) {
      newErrors.publishedDate = "Enter a valid date (YYYY-MM-DD)";
    } else if (new Date(formData.publishedDate) > new Date()) {
      newErrors.publishedDate = "Published date cannot be in the future";
    }
    if (!formData.genre) newErrors.genre = "Genre is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { data } = await updateBook({
          variables: {
            id: formData.id,
            updateBookInput: {
              id: formData.id,
              title: formData.title,
              author: formData.author,
              publishedDate: formData.publishedDate,
              genre: formData.genre,
            },
          },
        });

        if (data?.updateBook) {
          setSuccessMessage("Book updated successfully!");
          // Optional: Redirect back to book list
          // router.push("/books");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  if (queryLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (queryError) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Alert severity="error">Error loading book: {queryError.message}</Alert>
      </Box>
    );
  }

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
          Update Book
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
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              required
            />

            <Input
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              error={Boolean(errors.author)}
              helperText={errors.author}
              required
            />

            <Input
              label="Published Date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              error={Boolean(errors.publishedDate)}
              helperText={errors.publishedDate}
              required
            />

            <TextField
              select
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              error={Boolean(errors.genre)}
              helperText={errors.genre}
              required
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>

            {error && (
              <Alert severity="error">
                Something went wrong while updating the book.
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}

            <Box textAlign="center" mt={2}>
              <CustomButton
                name={loading ? "Updating..." : "Update Book"}
                type="submit"
                disabled={loading}
              />
              {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

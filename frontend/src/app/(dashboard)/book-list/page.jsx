"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const mockBooks = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    year: "2018",
    genre: "Non-fiction",
  },
  {
    id: "2",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: "1937",
    genre: "Fantasy",
  },
  {
    id: "3",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: "2011",
    genre: "Non-fiction",
  },
  {
    id: "4",
    title: "Clean Code",
    author: "Robert C. Martin",
    year: "2008",
    genre: "Non-fiction",
  },
  {
    id: "5",
    title: "1984",
    author: "George Orwell",
    year: "1949",
    genre: "Fiction",
  },
  {
    id: "6",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: "1925",
    genre: "Fiction",
  },
  {
    id: "7",
    title: "Deep Work",
    author: "Cal Newport",
    year: "2016",
    genre: "Non-fiction",
  },
  {
    id: "8",
    title: "Harry Potter",
    author: "J.K. Rowling",
    year: "1997",
    genre: "Fantasy",
  },
];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(mockBooks);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const router = useRouter();

  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.genre]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleEdit = (id) => {
    router.push(`/books/${id}/edit`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      console.log(`Deleted book with id: ${id}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        📚 All Books
      </Typography>

      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search by title, author, or genre..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
        sx={{ my: 3 }}
      />

      {paginatedBooks.length > 0 ? (
        <>
          <Grid container spacing={3} >
            {paginatedBooks.map((book) => (
              <Grid item xs={12} md={4} key={book.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 2,
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <BookIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {book.title}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Author:</strong> {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Year:</strong> {book.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Genre:</strong> {book.genre}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      color="primary"
                      fullWidth
                      onClick={() => handleEdit(book.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      fullWidth
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No books found.
        </Typography>
      )}
    </Box>
  );
}

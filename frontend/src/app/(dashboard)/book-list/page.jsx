"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  InputAdornment,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKS, SEARCH_BOOKS } from "@/graphql/books/queries";
import Loading from "@/components/ui/Loading";
import { DELETE_BOOK } from "@/graphql/books/mutation";
import { useSnackbar } from "notistack";

export default function BooksPage() {
  const token = sessionStorage.getItem("TKN");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null;

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const { enqueueSnackbar } = useSnackbar();
  const [books, setBooks] = useState([]);

  //  fetch of books
  const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch: searchRefetch,
  } = useQuery(SEARCH_BOOKS, {
    variables: { searchTerm: searchInput },
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const [deleteBook, { loading: deleteLoading }] = useMutation(DELETE_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: ["GetBooks"],
  });

  useEffect(() => {
    if (data && data.books) {
      setBooks(data.books);
    }
  }, [data]);

  // Handle search
  const handleSearch = async () => {
    setPage(1);
    setSearch(searchInput);
    if (searchInput.trim() === "") {
      enqueueSnackbar("Please enter a search term", { variant: "warning" });
      return;
    }

    try {
      const { data } = await searchRefetch({
        variables: { searchTerm: searchInput },
      });
      if (data) {
        setBooks(data.searchBook);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtering books client-side by the confirmed search term
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
    router.push(`/book/${id}`);
  };

  // Handle delete book
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        const { data } = await deleteBook({
          variables: { id },
        });

        if (data?.removeBook === true) {
          enqueueSnackbar("Book deleted successfully!", { variant: "success" });
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar("Try again later", {
          variant: "error",
        });
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        📚 All Books
      </Typography>

      <Box sx={{ display: "flex", gap: 2, my: 3 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search by title, author, or genre..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ minWidth: 100 }}
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <Loading />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <Typography variant="body1" color="error" textAlign="center">
            Error loading books: {error.message}
          </Typography>
        </Box>
      )}

      {!loading && !error && (
        <>
          {paginatedBooks.length > 0 ? (
            <>
              <Grid container spacing={3}>
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
                        <strong>Year:</strong> {book.publishedDate}
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
                          disabled={deleteLoading}
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
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              No books found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

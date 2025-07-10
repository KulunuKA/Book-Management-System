"use client";

import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import CustomButton from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 3, md: 6 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          width: "100%",
          background: "#ffffff",
          borderRadius: 3,
          boxShadow: 3,
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          color="primary.main"
        >
          📚 Book Management System
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Welcome to your library management platform! Easily manage your book
          collection with powerful tools for adding, browsing, searching,
          editing, and deleting books.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={2}>
          <Typography variant="body1">
            <strong>Features include:</strong>
          </Typography>
          <Typography variant="body2">
            • Create new books with details like title, author, published year,
            and genre.
          </Typography>
          <Typography variant="body2">
            • Browse and search your entire library.
          </Typography>
          <Typography variant="body2">
            • Edit or delete book information.
          </Typography>
          <Typography variant="body2">
            • User authentication for secure access.
          </Typography>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Box>
          <CustomButton name="Login" onClick={() => router.push("/login")} />
        </Box>
      </Box>
    </Box>
  );
}

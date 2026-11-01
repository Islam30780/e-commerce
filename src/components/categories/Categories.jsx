import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://knowledgeshop.runasp.net/api/Categories",
        {
          headers: {
            "Accept-Language": "ar",
          },
        }
      );

      setCategories(response.data.response.data);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) return <CircularProgress />;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" component="h1" sx={{ p: 2 }}>
        Categories
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {categories.map((category) => (
          <Chip label={category.name} clickable />
        ))}
      </Box>
    </Box>
  );
}

import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import api from "../axios/apiService";
import axios from "axios";
import { toast } from "react-toastify";

interface NavbarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ setSearchResults, setIsSearching }: NavbarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setQuery(e.target.value);
};

  const handleSearch = async () => {
    if (!query.trim() || !query) {
      setIsSearching(false);
      return;
    }

    try {
      const response = await api.get(`/movies/search?query=${query}`);
      console.log(response.data.data)

      setSearchResults(response.data.data);
      setIsSearching(true);
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    setSearchResults([]);
    setIsSearching(true);

    toast.error(error.response?.data.message, {
      autoClose: 2000,
    });
  }
}
  };
  useEffect(() => {
  const timer = setTimeout(() => {
    if (query.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [query]);

  return (
    <Box
      sx={{
        display: "flex",
        mb: 4,
        gap: 2
      }}
    >
      <TextField
        fullWidth
        placeholder="Search Movies..."
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        sx={{
          bgcolor: "white",
          borderRadius: 5,
          border: 'none',
        }}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        sx={{borderRadius: 3, marginRight: '20px', border: 'none'}}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
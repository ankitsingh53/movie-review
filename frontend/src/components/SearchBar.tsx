
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import api from "../axios/apiService";

interface NavbarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ setSearchResults, setIsSearching }: NavbarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e)=>{
    setQuery(e.target.value)
    setIsSearching(false);
  }

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 4,
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
          borderRadius: 1,
        }}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
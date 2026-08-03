import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  onAddFavorite?: (movieId: number) => void;
}

const MovieCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  onAddFavorite,
}: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 300,
        bgcolor: "#1E1E1E",
        color: "white",
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    > 
    <Stack>
      <CardMedia  component="img" height="370" image={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />

      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#BDBDBD",
            mb: 2,
          }}
        >
         Released Date: {releaseDate}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center'
          }}
        >
          <IconButton color="error" onClick={() => onAddFavorite?.(id)}>
            <FavoriteBorderIcon />
          </IconButton>

          <Button variant="contained" onClick={() => navigate(`/movie/${id}`)}>
            Details
          </Button>
        </Box>
      </CardContent>
      </Stack>
    </Card>
  );
};

export default MovieCard;

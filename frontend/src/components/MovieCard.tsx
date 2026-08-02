import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  onFavorite?: (id: number) => void;
}

const MovieCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  onFavorite,
}: MovieCardProps) => {
  const navigate = useNavigate();

  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card
      sx={{
        width: 260,
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
      <CardMedia
        component="img"
        height="370"
        image={imageUrl}
        alt={title}
      />

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

        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <Rating
            value={rating / 2}
            precision={0.5}
            readOnly
            size="small"
          />

          <Typography variant="body2">
            {rating.toFixed(1)}
          </Typography>
        </Box> */}

        <Typography
          variant="body2"
          sx={{
            color: "#BDBDBD",
            mb: 2,
          }}
        >
          {releaseDate}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="error"
            onClick={() => onFavorite?.(id)}
          >
            <FavoriteBorderIcon />
          </IconButton>

          <Button
            variant="contained"
            onClick={() => navigate(`/movie/${id}`)}
          >
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;


import { Box, Typography, Button, keyframes, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 100,
          color: "error.main",
          mb: 2,
          animation: `${pulse} 2s infinite`,
        }}
      />
      <Typography variant="h3" component="h1" gutterBottom>
        Oops! Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.primary" mb={4}>
        La página que estás buscando no existe o fue movida.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ mr: 0 }}
        >
          Volver atrás
        </Button>
      </Box>
    </Container>
  );
}

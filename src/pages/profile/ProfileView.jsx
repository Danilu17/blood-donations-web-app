import { Box, Typography, Paper, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const ProfileView = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Mi Perfil
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Aquí podés ver tus datos personales, tu estado de elegibilidad y tu
        nivel dentro del sistema.
      </Typography>

      <Paper
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          boxShadow: 2,
          bgcolor: "background.default",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <ProfileCard user={user} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfileView;

import { Box, Typography, Paper, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const ProfileView = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Mi Perfil
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Aquí podés ver tus datos personales, tu estado de elegibilidad y tu
        nivel dentro del sistema.
      </Typography>

      <Paper
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 3,
          borderRadius: 2,
        }}
        elevation={0}
        variant="outlined"
      >
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <ProfileCard user={user} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfileView;

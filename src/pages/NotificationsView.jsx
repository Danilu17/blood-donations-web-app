import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "../apis/notifications.api";

const NotificationsView = () => {
  const { data: notifications = [], isLoading } = useGetNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();

  const handleMarkRead = async (id) => {
    try {
      await markRead(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Notificaciones
      </Typography>
      {isLoading ? (
        <Typography>Cargando...</Typography>
      ) : notifications.length === 0 ? (
        <Typography>No hay notificaciones.</Typography>
      ) : (
        <List>
          {notifications.map((n) => (
            <ListItem
              key={n.id}
              sx={{
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: n.is_read ? "transparent" : "#eff6ff",
              }}
              secondaryAction={
                !n.is_read && (
                  <IconButton edge="end" onClick={() => handleMarkRead(n.id)}>
                    <DoneIcon color="primary" />
                  </IconButton>
                )
              }
            >
              <ListItemText primary={n.title} secondary={n.message} />
              <Chip
                label={n.type}
                size="small"
                color={
                  n.type === "alert"
                    ? "error"
                    : n.type === "reminder"
                      ? "warning"
                      : "default"
                }
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default NotificationsView;

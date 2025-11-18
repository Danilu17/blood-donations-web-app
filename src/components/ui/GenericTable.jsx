import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const GenericTable = ({
  title,
  subtitle,
  columns,
  data,
  isLoading,
  isError,
  error,
  addButton,
  onRowClick,
}) => {
  if (isLoading) return <CircularProgress aria-label="Loading data..." />;
  if (isError) return <Alert severity="error">Error: {error?.message}</Alert>;

  return (
    <Paper>
      <Toolbar sx={{ px: 2, py: 1 }}>
        <div>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </div>
        {addButton && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addButton.onClick}
            sx={{ ml: "auto" }}
          >
            {addButton.label}
          </Button>
        )}
      </Toolbar>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || "left"}
                  sx={{ fontWeight: 600 }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id || index}
                hover
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                sx={onRowClick ? { cursor: "pointer" } : undefined}
              >
                {columns.map((col) => (
                  <TableCell
                    key={`${row.id || index}-${col.id}`}
                    align={col.align || "left"}
                  >
                    {col.render ? col.render(row) : getNestedValue(row, col.id)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Helper function to get nested values (e.g., "user.name")
function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj) || "N/A";
}

GenericTable.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      render: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.object,
  addButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  onRowClick: PropTypes.func,
};

export default GenericTable;

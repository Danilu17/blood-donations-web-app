import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useGetRankingQuery, useGetMyRankingQuery } from "../apis/ranking.api";

const RankingView = () => {
  const { data: rankingList = [], isLoading } = useGetRankingQuery();
  const { data: myRanking } = useGetMyRankingQuery();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Ranking de Donantes
      </Typography>
      {myRanking && (
        <Typography variant="subtitle1" mb={2}>
          Tu posición:{" "}
          {rankingList.findIndex((r) => r.user.id === myRanking.user.id) + 1}º -
          Nivel: {myRanking.level.toUpperCase()} - Puntos: {myRanking.points}
        </Typography>
      )}
      {isLoading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Puntos</TableCell>
              <TableCell>Nivel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankingList.map((r, idx) => (
              <TableRow
                key={r.id}
                selected={myRanking && myRanking.id === r.id}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{r.user.name}</TableCell>
                <TableCell>{r.points}</TableCell>
                <TableCell>{r.level.toUpperCase()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default RankingView;

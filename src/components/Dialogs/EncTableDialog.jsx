// Mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function EncTableDialog({ open, setOpen }) {
  const rows = [
    { name: "Spinda", percentage: "50%" },
    { name: "Pidgey", percentage: "40%" },
    { name: "Manaphy", percentage: "10%" },
  ];

  return (
    <Dialog open={open} onClose={() => setOpen(false)} width="100%">
      <DialogTitle fontWeight={"bold"} variant="h4">
        Encounter Table
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pokemon</TableCell>
                <TableCell align="right">%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

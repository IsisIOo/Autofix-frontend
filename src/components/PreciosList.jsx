import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import preciosService from "../services/precios.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const PreciosList = () => {
  const [precios, setPrecios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrecios();
  }, []);

  const fetchPrecios = () => {
    preciosService.getAll()
      .then(response => {
        console.log("Mostrando listado de todos los precios ingresados.", response.data);
        setPrecios(response.data);
      })
      .catch(error => {
        console.log("Se ha producido un error al intentar mostrar listado de todos los precios.", error);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Está seguro que desea borrar este precio?");
    if (confirmDelete) {
      preciosService.remove(id)
        .then(response => {
          console.log("Precio ha sido eliminado.", response.data);
          fetchPrecios(); // Actualizar la lista después de eliminar
        })
        .catch(error => {
          console.log("Se ha producido un error al intentar eliminar el precio", error);
        });
    }
  };

  return (
    <Paper style={{ backgroundColor: 'white' }}>
      <TableContainer component={Paper}>
        <Typography variant="h5" gutterBottom style={{ padding: '1rem' }}>
          Listado de Precios de Reparaciones
        </Typography>

        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Nombre Reparación</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Gasolina</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Diesel</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Híbrido</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Eléctrico</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {precios.map((precio) => (
              <TableRow key={precio.id}>
                <TableCell align="left">{precio.repairName}</TableCell>
                <TableCell align="left">{precio.gasolineAmount}</TableCell>
                <TableCell align="right">{precio.dieselAmount}</TableCell>
                <TableCell align="right">{precio.hybridAmount}</TableCell>
                <TableCell align="right">{precio.electricAmount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(precio.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PreciosList;

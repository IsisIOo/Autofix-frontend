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
import Typography from "@mui/material/Typography"; // Importa Typography para usar como título

const PreciosList2 = () => {
  const [precios, setPrecios] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    preciosService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los descuentos ingresados.", response.data);
        setPrecios(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los descuentos.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Está seguro que desea borrar este descuento?");
    if (confirmDelete) {
      preciosService.remove(id)
        .then((response) => {
          console.log("Descuento ha sido eliminado.", response.data);
          init(); // Actualizar la lista después de eliminar
        })
        .catch((error) => {
          console.log("Se ha producido un error al intentar eliminar el descuento", error);
        });
    }
  };

  return (
    <Paper style={{ backgroundColor: 'white' }}>
      <TableContainer component={Paper}>
        <Typography variant="h5" gutterBottom style={{ padding: '1rem' }}>
          Listado de Descuentos por Marca
        </Typography>
        <Link to="/car/add" style={{ textDecoration: "none", marginBottom: "1rem" }}>
          <Button variant="contained" color="primary" startIcon={<PersonAddIcon />}>
            Agregar Precio
          </Button>
        </Link>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Toyota</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Ford</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Hyundai</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Honda</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {precios.map((precio) => (
              <TableRow key={precio.id}>
                <TableCell align="left">{precio.toyota}</TableCell>
                <TableCell align="right">{precio.ford}</TableCell>
                <TableCell align="right">{precio.hyundai}</TableCell>
                <TableCell align="right">{precio.honda}</TableCell>
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

export default PreciosList2;

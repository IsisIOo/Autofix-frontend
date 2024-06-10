import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import preciosService from "../services/precios.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PreciosList = () => {
  const [precios, setPrecios] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    preciosService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los precios ingresados.", response.data);
        setPrecios(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los precios.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este precio?"
    );
    if (confirmDelete) {
      carService
        .remove(id)
        .then((response) => {
          console.log("precio ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al precio",
            error
          );
        });
    }
  };

 // const handleEdit = (id) => {
 //   console.log("Printing id", id);
 //   navigate(`/car/edit/${id}`);
  //};

  return (
    <Paper style={{ backgroundColor: 'white' }}>
    <TableContainer component={Paper} >
      <br />
      <Link
        to="/car/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >

      </Link>

      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Nombre reparacion
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Gasolina
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Diesel
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Hibrido
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Electrico
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {precios.map((precio) => (
            <TableRow
              key={precio.id}
            >
          <TableCell align="left">{precio.repairName}</TableCell>
          <TableCell align="left">{precio.gasolineAmount}</TableCell>
          <TableCell align="right">{precio.dieselAmount}</TableCell>
          <TableCell align="right">{precio.hibridAmount}</TableCell>
          <TableCell align="right">{precio.electricAmount}</TableCell> {/* Año de producción */}

          <TableCell>

          <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(repair.id)}
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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import costService from "../services/cost.service";
import Paper from "@mui/material/Paper";
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CostList = () => {
  const [cost, setCost] = useState([]);

  const init = () => {
    costService.getAll()
      .then((response) => {
        console.log(
          "Mostrando planilla de Costos totales.",
          response.data
        );
        setCost(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar los Costos totales.",
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
      "¿Esta seguro que desea borrar este ticket?"
    );
    if (confirmDelete) {
      costService
        .remove(id)
        .then((response) => {
          console.log("ticket ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el ticket",
            error
          );
        });
    }
  };
  

  return (
    <Paper style={{ backgroundColor: 'white' }}>
    <TableContainer component={Paper} >
      <br />
      <Link
        to="/cost/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "0.5rem", color  : "white", backgroundColor: "#D6589F"}}
          startIcon={<PersonAddIcon />}
        >
          Crear Boleta
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>            
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total reparacion
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total IVA
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Descuento dia
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Descuento Bonus
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cargo atraso
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cargo Kilometraje
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
             Cargo antiguedad
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total Costo
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cost.map((cost) => (
            <TableRow
              key={cost.id}
            >
              <TableCell align="right">{cost.patent}</TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.totalOriginal
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.iva
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.discountPerDay
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.discountPerbonus
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.delayCharge
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.mileageCharge
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.seniorityCharge
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.totalAmount
                )}
              </TableCell>
              <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(cost.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleDelete(cost.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<AddCircleIcon />}
                >
                  Aplicar Bono
                </Button>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default CostList;

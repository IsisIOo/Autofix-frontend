import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import carService from "../services/car.service";
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
import reporte1Service from "../services/reporte1.service";

const Reporte1List = () => {
  const [reporte1, setReporte1] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    reporte1Service
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los reportes ingresados.", response.data);
        setReporte1(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los reportes.",
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
      "¿Esta seguro que desea borrar este reporte?"
    );
    if (confirmDelete) {
      reporte1Service
        .remove(id)
        .then((response) => {
          console.log("auto ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al auto",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/car/edit/${id}`);
  };

  return (
    <Paper style={{ backgroundColor: 'white' }}>
    <TableContainer component={Paper} >
      <br />
      <Link
        to="/reporte1/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "0.5rem", color  : "white", backgroundColor: "#D6589F"}}
          startIcon={<PersonAddIcon />}
        >
          Añadir Reporte
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Mes 
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo de reparacion 
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {reporte1.map((reporte1) => (
            <TableRow
              key={reporte1.id}
            >
          <TableCell align="left">{reporte1.mes}</TableCell>
          <TableCell align="right">{reporte1.repairtype}</TableCell>


          <TableCell>
                <Button
                 // variant="contained"
                  //color="info"
                  //size="small"
                  //onClick={() => handleEdit(car.patent)}
                  //style={{ marginLeft: "0.5rem" }}
                  //startIcon={<EditIcon />}
                  
                >
                  
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(car.id)}
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

export default Reporte1List;
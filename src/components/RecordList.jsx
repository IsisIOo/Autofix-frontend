import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import recordService from "../services/record.service";
import detalleService from "../services/detalle.service";
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
import InfoIcon from '@mui/icons-material/Info';

const RepairList = () => {
  const [repairs, setRepair] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    detalleService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los historiales ingresados.", response.data);
        setRepair(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los historiales.",
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
      "¿Esta seguro que desea borrar este historial?"
    );
    if (confirmDelete) {
      detalleService
        .remove(id)
        .then((response) => {
          console.log("historial ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al historial",
            error
          );
        });
    }
  };




//trato de crear un boton que redireccione a los detalles del costo
  const handleDetailsCost = (patent) => {
    console.log("Printing patente", patent);
    navigate(`/Cost/details/${patent}`);
  };
  

//trato de crear un boton que redireccione a los detalles del costo PARA PEP2
const handleDetailsCost2 = (patent) => {
  console.log("Printing patente", patent);
  navigate(`/Cost/details-2/${patent}`);
};




  return (
    <Paper style={{ backgroundColor: 'white' }}>
    <TableContainer component={Paper}> 
      <br />
      <Link
        to="/record/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "0.5rem", color  : "white", backgroundColor: "#D6589F"}}
          startIcon={<PersonAddIcon />}
        >
          Añadir Historial
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha admision
            </TableCell>            
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Hora admision
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Fecha retiro
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Hora retiro
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Fecha retirado
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Hora retirado
            </TableCell>    
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Costo IVA
            </TableCell> 
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Descuentos
            </TableCell> 
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Recargos
            </TableCell>  
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Costo Total
            </TableCell> 

          </TableRow>
        </TableHead>
        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
          <TableCell align="left">{repair.patent}</TableCell>
          <TableCell align="left">
            {` ${repair.admissionDateDayName}, ${repair.admissionDateDay}/${repair.admissionDateMonth}/2024`}
          </TableCell>
          <TableCell align="right">{repair.admissionHour}</TableCell>
          <TableCell align="left">
            {`${repair.departureDateDay}/${repair.departureDateMonth}/2024`}
          </TableCell>
          <TableCell align="right">{repair.departureHour}</TableCell>
          <TableCell align="left">
            {`${repair.clientDateDay}/${repair.clientDateMonth}/2024`}
          </TableCell>
          <TableCell align="right">{repair.clientHour}</TableCell>
          <TableCell align="right">{repair.totalIva}</TableCell>
          <TableCell align="right">{repair.totalDiscounts}</TableCell>
          <TableCell align="right">{repair.totalRecharges}</TableCell>
          <TableCell align="right">{repair.totalAmount}</TableCell>

              

              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleDetailsCost2(repair.patent)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<InfoIcon />}
                >
                  Detalles
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  //onClick={() => handleDelete(repair.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                Agregar bono 
                </Button>


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

export default RepairList;
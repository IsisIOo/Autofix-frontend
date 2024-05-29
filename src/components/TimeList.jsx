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
import carService from "../services/car.service";
import Paper from "@mui/material/Paper";
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CostList = () => {
  const [cost, setCost] = useState([]);
  const [cars, setCars] = useState([]);

  const init = () => {
    Promise.all([costService.getAll(), carService.getAll()])
    .then(([costResponse, carResponse]) => {
      console.log("Mostrando planilla de Tiempos.", costResponse.data);
      console.log("Mostrando lista de autos.", carResponse.data);
      
      const groupedCosts = groupCostsByBrand(costResponse.data, carResponse.data);
      const sortedCosts = {};
      
      for (const brand in groupedCosts) {
        sortedCosts[brand] = groupedCosts[brand].sort((a, b) => a.workTime - b.workTime);
      }
      
      const flattenedCosts = Object.values(sortedCosts).flatMap((costs) => costs);
      
      setCost(flattenedCosts);
      setCars(carResponse.data); 
    })
    .catch((error) => {
      console.log(
        "Se ha producido un error al intentar mostrar los Tiempos.",
        error
      );
    });
};

// Función para agrupar costos por marca
const groupCostsByBrand = (costs, cars) => {
  const groupedCosts = {};
  for (const cost of costs) {
    const car = cars.find((car) => car.patent === cost.patent);
    if (car) {
      const brand = car.brand;
      if (!groupedCosts[brand]) {
        groupedCosts[brand] = [];
      }
      groupedCosts[brand].push(cost);
    }
  }
  return groupedCosts;
};

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este tiempo?"
    );
    if (confirmDelete) {
      costService
        .remove(id)
        .then((response) => {
          console.log("tiempo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el tiempo",
            error
          );
        });
    }
  };
  

  return (
    <Paper style={{ backgroundColor: 'white' }}>
    <TableContainer component={Paper} >
      <br />
      <h3>Tiempos de espera</h3>

      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>   
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Marca
            </TableCell>   
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tiempo total (en dias)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cost.map((costItem) => {
            const car = cars.find((carItem) => carItem.patent === costItem.patent);
            return (
              <TableRow key={costItem.id}>
                <TableCell align="right">{costItem.patent}</TableCell>
                <TableCell align="left">{car ? car.brand : 'N/A'}</TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                    costItem.workTime
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default CostList;

import React, { useEffect, useState } from "react";
import costService from "../services/cost.service";
import recordService from "../services/record.service";
import carService from "../services/car.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TablaRep = () => {
  const [repairData, setRepairData] = useState([]);

  useEffect(() => {
    fetchRepairData();
  }, []);

const fetchRepairData = () => {
    Promise.all([recordService.getAll(), carService.getAll()])
      .then(([repairResponse, carResponse]) => {
        const repairs = repairResponse.data;
        const cars = carResponse.data;
  
        // Crear un objeto para almacenar las reparaciones agrupadas por tipo de vehículo
        const groupedRepairs = {};
  
        // Iterar sobre cada reparación y agruparlas por tipo de vehículo
        repairs.forEach((repair) => {
          const car = cars.find((car) => car.patent === repair.patent);
          if (car) {
            const key = `${repair.repairType}-${car.type}`; // Utilizar solo el tipo de vehículo como clave
            if (!groupedRepairs[key]) {
              // Si no existe la clave, crear un nuevo objeto con la información
              groupedRepairs[key] = {
                type: car.type,
                repairType: repair.repairType,
                numVehicles: 1,
                totalCost: repair.totalAmount,
              };
            } else {
              // Si la clave ya existe, incrementar el número de vehículos y el costo total
              groupedRepairs[key].numVehicles++;
              groupedRepairs[key].totalCost += repair.totalAmount;
            }
          }
        });
  
        // Convertir el objeto en un array
        const repairArray = Object.values(groupedRepairs);
  
        // Ordenar el array por monto total de reparaciones de mayor a menor
        repairArray.sort((a, b) => b.totalCost - a.totalCost);
  
        setRepairData(repairArray);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de reparaciones:", error);
      });
  };
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo de Reparación</TableCell>
            <TableCell>Tipo de vehículo</TableCell>
            <TableCell>Número de Vehículos Reparados</TableCell>
            <TableCell>Monto Total de Reparaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repairData.map((repair, index) => (
            <TableRow key={index}>
              <TableCell>{repair.repairType}</TableCell>
              <TableCell>{repair.type}</TableCell>
              <TableCell>{repair.numVehicles}</TableCell>
              <TableCell>{repair.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaRep;

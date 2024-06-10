import React, { useEffect, useState } from "react";
import detalleService from "../services/detalle.service";
import carService from "../services/car.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TablaReparacionTipo = () => {
  const [repairData, setRepairData] = useState([]);

  const repairTypes = [
    "Reparaciones del Sistema de Frenos",
    "Servicio del Sistema de Refrigeración",
    "Reparaciones del Motor",
    "Reparaciones de la Transmisión",
    "Reparación del Sistema Eléctrico",
    "Reparaciones del Sistema de Escape",
    "Reparación de Neumáticos y Ruedas",
    "Reparaciones de la Suspensión y la Dirección",
    "Reparación del Sistema de Aire Acondicionado y Calefacción",
    "Reparaciones del Sistema de Combustible",
    "Reparación y Reemplazo del Parabrisas y Cristales"
  ];

  const vehicleTypes = ["Sedan", "Hatchback", "SUV", "Pickup", "Furgoneta"];

  useEffect(() => {
    fetchRepairData();
  }, []);

  const fetchRepairData = () => {
    Promise.all([detalleService.getAll(), carService.getAll()])
      .then(([repairResponse, carResponse]) => {
        const repairs = repairResponse.data;
        const cars = carResponse.data;

        // Crear un objeto para almacenar las reparaciones agrupadas
        const groupedRepairs = {};
        const totalCostPerVehicle = {};
        const totalVehiclesPerRepair = {};

        // Inicializar el objeto con todos los tipos de reparaciones y vehículos
        repairTypes.forEach(repairType => {
          groupedRepairs[repairType] = {};
          vehicleTypes.forEach(vehicleType => {
            groupedRepairs[repairType][vehicleType] = {
              numVehicles: 0,
              totalCost: 0,
            };
          });
        });

        // Iterar sobre cada reparación y agruparlas
        repairs.forEach((repair) => {
          const car = cars.find((car) => car.patent === repair.patent);
          if (car) {
            const { repairType } = repair;
            const { motorType } = car;
            
            groupedRepairs[repairType][motorType].numVehicles++;
            groupedRepairs[repairType][motorType].totalCost += repair.totalAmount;

            if (!totalCostPerVehicle[motorType]) {
              totalCostPerVehicle[motorType] = 0;
            }
            totalCostPerVehicle[motorType] += repair.totalAmount;

            if (!totalVehiclesPerRepair[repairType]) {
              totalVehiclesPerRepair[repairType] = 0;
            }
            totalVehiclesPerRepair[repairType]++;
          }
        });

        setRepairData(groupedRepairs);
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
            <TableCell>Lista de Reparaciones</TableCell>
            {vehicleTypes.map((vehicleType, index) => (
              <TableCell key={index} align="right">{vehicleType}</TableCell>
            ))}
            <TableCell align="right">TOTAL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repairTypes.map((repairType, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>{repairType}</TableCell>
                {vehicleTypes.map((vehicleType, idx) => (
                  <TableCell key={idx} align="right">
                    {repairData[repairType]?.[vehicleType]?.numVehicles || 0}
                  </TableCell>
                ))}
                <TableCell align="right">
                  {Object.values(repairData[repairType] || {}).reduce((acc, val) => acc + (val.numVehicles || 0), 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                {vehicleTypes.map((vehicleType, idx) => (
                  <TableCell key={idx} align="right">
                    {repairData[repairType]?.[vehicleType]?.totalCost || 0}
                  </TableCell>
                ))}
                <TableCell align="right">
                  {Object.values(repairData[repairType] || {}).reduce((acc, val) => acc + (val.totalCost || 0), 0)}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
          <TableRow>
            <TableCell colSpan={vehicleTypes.length + 1} align="right">Total</TableCell>
            <TableCell align="right">
              {Object.values(repairData).reduce((acc, repairTypeData) => {
                return acc + Object.values(repairTypeData).reduce((subAcc, val) => subAcc + (val.totalCost || 0), 0);
              }, 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={vehicleTypes.length + 1} align="right"></TableCell>
          </TableRow>
          <TableRow>
            {vehicleTypes.map((vehicleType, index) => (
              <TableCell key={index} align="right">
                {Object.values(repairData).reduce((acc, repairTypeData) => acc + (repairTypeData[vehicleType]?.totalCost || 0), 0)}
              </TableCell>
            ))}
            <TableCell align="right">
              {Object.values(repairData).reduce((acc, repairTypeData) => {
                return acc + Object.values(repairTypeData).reduce((subAcc, val) => subAcc + (val.totalCost || 0), 0);
              }, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaReparacionTipo;

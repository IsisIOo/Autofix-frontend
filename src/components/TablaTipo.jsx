import React, { useEffect, useState } from "react";
import detalleService from "../services/detalle.service";
import reportesService from "../services/reportes.service";
import carService from "../services/car.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const TablaReparacionTipo = () => {
  const [repairData, setRepairData] = useState({});
  const [month, setMonth] = useState('');

  const repairTypes = [
    "Reparaciones del Sistema de Frenos",
    "Servicio del Sistema de Refrigeración",
    "Reparaciones del Motor",
    "Reparaciones de la transmisión",
    "Reparacion del Sistema Electrico",
    "Reparaciones del Sistema de Escape",
    "Reparacion de Neumaticos y Ruedas",
    "Reparaciones de la Suspension y la Direccion",
    "Reparacion del Sistema de Aire Acondicionado y Calefaccion",
    "Reparaciones del Sistema de Combustible",
    "Reparacion y Reemplazo del Parabrisas y Cristales"
  ];

  const vehicleTypes = ["Sedan", "Hatchback", "SUV", "Pickup", "Furgoneta"];

  useEffect(() => {
    fetchRepairData();
  }, [month]);

  const fetchRepairData = () => {
    Promise.all([reportesService.getAllReportes(), reportesService.getAllCar()])
      .then(([repairResponse, carResponse]) => {
        const repairs = repairResponse.data;
        const cars = carResponse.data;

        // Filtrar reparaciones por el mes ingresado
        const filteredRepairs = month
          ? repairs.filter(repair => repair.admissionDateMonth === parseInt(month, 10))
          : repairs;

        // Crear un objeto para almacenar las reparaciones agrupadas
        const groupedRepairs = {};

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
        filteredRepairs.forEach((repair) => {
          const car = cars.find((car) => car.patent.trim() === repair.patent.trim());
          if (car) {
            const { repairType } = repair;
            const { type } = car;

            // Si hay múltiples tipos de reparación para un vehículo, dividirlos y agregarlos por separado
            const repairTypes = repairType.split(", ");

            repairTypes.forEach(repairType => {
              if (groupedRepairs[repairType] && groupedRepairs[repairType][type]) {
                groupedRepairs[repairType][type].numVehicles++;
                groupedRepairs[repairType][type].totalCost += repair.totalAmount;
              }
            });
          } else {
            console.log(`No se encontró el vehículo para la patente ${repair.patent}`);
          }
        });

        console.log("Datos de reparaciones agrupadas:", groupedRepairs);
        setRepairData(groupedRepairs);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de reparaciones:", error);
      });
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Mes (1-12)"
        type="number"
        value={month}
        onChange={handleMonthChange}
        InputProps={{ inputProps: { min: 1, max: 12 } }}
        style={{ marginBottom: '1rem' }}
      />

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
    </div>
  );
};

export default TablaReparacionTipo;

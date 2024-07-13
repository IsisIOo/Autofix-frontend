import React, { useState, useEffect } from "react";
import detalleService from "../services/detalle.service";
import reportesService from "../services/reportes.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const TablaReparacionMes = () => {
  const [repairData, setRepairData] = useState({});
  const [month, setMonth] = useState("");

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
    "Reparacion y Reemplazo del Parabrisas y Cristales",
  ];

  const fetchRepairData = async (selectedMonth) => {
    try {
      const repairResponse = await reportesService.getAllReportes();
      const repairs = repairResponse.data;
  
      // Inicializar datos agrupados por tipo de reparación y período
      const groupedRepairs = {
        current: {},
        previous: {},
        next: {},
      };
  
      repairTypes.forEach((repairType) => {
        groupedRepairs.current[repairType] = { numVehicles: 0, totalCost: 0 };
        groupedRepairs.previous[repairType] = { numVehicles: 0, totalCost: 0 };
        groupedRepairs.next[repairType] = { numVehicles: 0, totalCost: 0 };
      });
  
      // Iterar sobre todas las reparaciones para calcular estadísticas y variaciones
      repairs.forEach((repair) => {
        const { admissionDateMonth, repairType, totalAmount } = repair;
  
        // Verificar si la reparación está dentro del rango de meses seleccionado
        if (
          admissionDateMonth === selectedMonth ||
          admissionDateMonth === selectedMonth - 1 ||
          admissionDateMonth === selectedMonth + 1
        ) {
          // Determinar el período (current, previous, next)
          const timePeriod =
            admissionDateMonth === selectedMonth
              ? "current"
              : admissionDateMonth === selectedMonth - 1
              ? "previous"
              : "next";
  
          // Separar las reparaciones por coma y limpiar espacios en blanco
          const repairTypeArray = repairType.split(",").map((r) => r.trim());
  
          // Actualizar estadísticas para cada tipo de reparación en la lista
          repairTypeArray.forEach((singleRepairType) => {
            if (repairTypes.includes(singleRepairType)) {
              groupedRepairs[timePeriod][singleRepairType].numVehicles++;
              groupedRepairs[timePeriod][singleRepairType].totalCost += totalAmount;
            }
          });
        }
      });
  
      // Actualizar el estado con los datos agrupados y calculados
      setRepairData(groupedRepairs);
    } catch (error) {
      console.error("Error fetching repair data:", error);
    }
  };
  
  // Función para manejar el cambio de mes en el input
  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value, 10);
    setMonth(selectedMonth.toString());
    if (!isNaN(selectedMonth) && selectedMonth >= 1 && selectedMonth <= 12) {
      fetchRepairData(selectedMonth);
    }
  };
  
  // Función para calcular la variación (%)
  const calculateVariation = (current, previous) => {
    if (previous === 0) return "N/A";
    return `${(((current - previous) / previous) * 100).toFixed(2)}%`;
  };
  
  return (
    <div>
      <TextField
        label="Mes (1-12)"
        type="number"
        value={month}
        onChange={handleMonthChange}
        InputProps={{ inputProps: { min: 1, max: 12 } }}
        style={{ marginBottom: "1rem" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>MES</TableCell>
              <TableCell align="right">Anterior</TableCell>
              <TableCell align="right">% Variación</TableCell>
              <TableCell align="right">Actual</TableCell>
              <TableCell align="right">% Variación</TableCell>
              <TableCell align="right">Siguiente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairTypes.map((repairType, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{repairType}</TableCell>
                  <TableCell align="right">
                    {repairData.previous?.[repairType]?.numVehicles || 0}
                  </TableCell>
                  <TableCell align="right">
                    {calculateVariation(
                      repairData.previous?.[repairType]?.numVehicles || 0,
                      repairData.current?.[repairType]?.numVehicles || 0
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {repairData.current?.[repairType]?.numVehicles || 0}
                  </TableCell>
                  <TableCell align="right">
                    {calculateVariation(
                      repairData.current?.[repairType]?.numVehicles || 0,
                      repairData.next?.[repairType]?.numVehicles || 0
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {repairData.next?.[repairType]?.numVehicles || 0}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {repairData.previous?.[repairType]?.totalCost || 0}
                  </TableCell>
                  <TableCell align="right">
                    {calculateVariation(
                      repairData.previous?.[repairType]?.totalCost || 0,
                      repairData.current?.[repairType]?.totalCost || 0
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {repairData.current?.[repairType]?.totalCost || 0}
                  </TableCell>
                  <TableCell align="right">
                    {calculateVariation(
                      repairData.current?.[repairType]?.totalCost || 0,
                      repairData.next?.[repairType]?.totalCost || 0
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {repairData.next?.[repairType]?.totalCost || 0}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell colSpan={6} align="right">
                Total
              </TableCell>
              <TableCell align="right">
                {Object.values(repairData.current || {}).reduce((acc, val) => acc + (val.totalCost || 0), 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TablaReparacionMes;

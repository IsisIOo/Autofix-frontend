import React, { useState, useEffect } from "react";
import detalleService from "../services/detalle.service";
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
    "Reparaciones de la Transmisión",
    "Reparación del Sistema Eléctrico",
    "Reparaciones del Sistema de Escape",
    "Reparación de Neumáticos y Ruedas",
    "Reparaciones de la Suspensión y la Dirección",
    "Reparación del Sistema de Aire Acondicionado y Calefacción",
    "Reparaciones del Sistema de Combustible",
    "Reparación y Reemplazo del Parabrisas y Cristales",
  ];

  const fetchRepairData = (monthInt) => {
    detalleService.getAll().then((repairResponse) => {
      const repairs = repairResponse.data;

      const previousMonth = monthInt === 1 ? 12 : monthInt - 1;
      const nextMonth = monthInt === 12 ? 1 : monthInt + 1;

      const filteredRepairs = {
        current: repairs.filter((repair) => repair.admissionDateMonth === monthInt),
        previous: repairs.filter((repair) => repair.admissionDateMonth === previousMonth),
        next: repairs.filter((repair) => repair.admissionDateMonth === nextMonth),
      };

      const groupedRepairs = {
        current: {},
        previous: {},
        next: {},
      };

      ["current", "previous", "next"].forEach((timePeriod) => {
        repairTypes.forEach((repairType) => {
          groupedRepairs[timePeriod][repairType] = {
            numVehicles: 0,
            totalCost: 0,
          };
        });
      });

      ["current", "previous", "next"].forEach((timePeriod) => {
        filteredRepairs[timePeriod].forEach((repair) => {
          const { repairType, totalAmount } = repair;

          repairTypes.forEach((type) => {
            if (repairType.includes(type)) {
              groupedRepairs[timePeriod][type].numVehicles++;
              groupedRepairs[timePeriod][type].totalCost += totalAmount;
            }
          });
        });
      });

      console.log("Datos de reparaciones agrupadas:", groupedRepairs);
      setRepairData(groupedRepairs);
    });
  };

  const handleMonthChange = (event) => {
    const monthValue = event.target.value;
    setMonth(monthValue);
    if (monthValue >= 1 && monthValue <= 12) {
      fetchRepairData(parseInt(monthValue, 10));
    }
  };

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

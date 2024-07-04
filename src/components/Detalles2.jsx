import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import detalleService from "../services/detalle.service";
import Paper from "@mui/material/Paper";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const Details = () => {
  const { id } = useParams();
  const [repair, setRepair] = useState(null); // Cambiado a null para indicar que no hay datos al principio

  const init = () => {
    detalleService.getOneRepairPORID(id)
      .then((response) => {
        console.log("Mostrando datos involucrados en el costo.", response.data);
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
  }, [id]);

  return (
    <TableContainer component={Paper}>
      <h3>Planilla de Detalles</h3>
      <hr />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Patente</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Tipo Reparacion</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Fecha Reparacion</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Hora Reparacion</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Total Costo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repair && (
            <TableRow key={repair.id}>
              <TableCell align="right">{repair.patent}</TableCell>
              <TableCell align="right">{repair.repairType}</TableCell>
              <TableCell align="left">{`${repair.admissionDateDay}/${repair.admissionDateMonth}/2024`}</TableCell>
              <TableCell align="right">{repair.admissionHour}</TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(repair.totalAmount)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Details;

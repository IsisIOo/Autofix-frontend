import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import costService from "../services/cost.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";
import { TableContainer } from "@mui/material";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import detalleService from "../services/detalle.service";


const Details = () => {
  const { patent } = useParams();
  const [detalle, setDetalle] = useState([]);

  const navigate = useNavigate();
 

  const init = () => {
    //costService.CALCULATODO(patent) //lo crea. AHORA LO HACE EN COST LIST Y ADDEDITCOST
      detalleService.getOneDetalle(patent) //lo busca

      .then((response) => {
        console.log("Mostrando datos involucrados en el costo.", response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los historiales.",
          error
        );
      });
  };

  useEffect(() => {
    init(); // Llamas a init y pasas la patente
  }, [patent]);

  return (
    <TableContainer component={Paper}>
      <h3>Planilla de Detalles</h3>
      <hr />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>    
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Tipo Reparacion
            </TableCell> 
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Dia Reparacion
            </TableCell>        
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Mes Reparacion
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Hora Reparacion
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total Costo
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detalle.map((detalle) => (
            <TableRow
              key={detalle.id}
            >
              <TableCell align="right">{detalle.patent}</TableCell>
              <TableCell align="right">{detalle.repairType}</TableCell>
              <TableCell align="right">{detalle.repairDay}</TableCell>
              <TableCell align="right">{detalle.repairMonth}</TableCell>
              <TableCell align="right">{detalle.repairHour}</TableCell>       

              
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  detalle.totalAmount
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



export default Details;

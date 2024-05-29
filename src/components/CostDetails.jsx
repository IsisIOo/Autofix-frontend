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


const CostDetails = () => {
  const { patent } = useParams();
  const [cost, setCost] = useState([]);

  const navigate = useNavigate();
 

  const init = () => {
    //costService.CALCULATODO(patent) //lo crea. AHORA LO HACE EN COST LIST Y ADDEDITCOST
      costService.getAllrepairs1(patent) //lo busca

      .then((response) => {
        console.log("Mostrando datos involucrados en el costo.", response.data);
        setCost(response.data);
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
      <h3>Planilla de Costos</h3>
      <hr />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Patente
            </TableCell>    
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            IVA
            </TableCell>        
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total reparacion
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Descuento dia
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Descuento Bonus
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cargo atraso
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cargo Kilometraje
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
             Cargo antiguedad
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total Costo
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cost.map((cost) => (
            <TableRow
              key={cost.id}
            >
              <TableCell align="right">{cost.patent}</TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.totalOriginal
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.iva
                )}
              </TableCell>

              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.discountPerDay
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.discountPerbonus
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.delayCharge
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.mileageCharge
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.seniorityCharge
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  cost.totalAmount
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



export default CostDetails;

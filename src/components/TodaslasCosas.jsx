import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import carService from "../services/car.service";
import detalleService from "../services/detalle.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';

const RepairList = () => {
  const [repairs, setRepairs] = useState([]);
  const [cars, setCars] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const response = await detalleService.getAll();
      setRepairs(response.data);
    } catch (error) {

    }
  };

  const fetchCars = async () => {
    try {
      const response = await carService.getAll();
      setCars(response.data);
    } catch (error) {
      console.log("Error fetching cars:", error);
    }
  };

  const mergeData = () => {
    const merged = repairs.map(repair => {
      // Normalizar la patente eliminando espacios en blanco y caracteres especiales
      const normalizedPatent = repair.patent.trim(); // Elimina espacios en blanco al inicio y al final
  
      // Buscar el auto correspondiente utilizando la patente normalizada
      const car = cars.find(c => c.patent === normalizedPatent);
  
      // Resto del código de mapeo y combinación...
      const totalRepairs = repair.totalAmount - (repair.totalRecharges + repair.totalIva) + repair.totalDiscounts;
      const subTotal = totalRepairs + repair.totalRecharges - repair.totalDiscounts;
  
      return {
        ...repair,
        brand: car ? car.brand : '',
        model: car ? car.model : '',
        type: car ? car.type : '',
        productionYear: car ? car.productionYear : '',
        motorType: car ? car.motorType : '',
        totalRepairs: totalRepairs,
        subTotal: subTotal
      };
    });
  
    setMergedData(merged);
  };
  

  useEffect(() => {
    const init = async () => {
      await fetchDetails();
      await fetchCars();
      mergeData();
    };
    init();
  }, [repairs, cars]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Está seguro que desea borrar este historial?");
    if (confirmDelete) {
      try {
        await detalleService.remove(id);
        fetchDetails();
      } catch (error) {
        console.log("Error deleting detail:", error);
      }
    }
  };

  const handleDetailsCost2 = (patent) => {
    navigate(`/Cost/details-2/${patent}`);
  };

  return (
    <Paper style={{ backgroundColor: 'white' }}>
      <TableContainer component={Paper}>
        <br />

        <br /> <br />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Patente</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Marca</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Modelo</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Año Fabricación</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo Motor</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha Ingreso</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Hora Ingreso</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Monto total reparaciones</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Total Recargos</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Total Descuentos</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>SUB Total</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Monto IVA</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Costo Total</TableCell>
              
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha de salida</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Hora de Salida</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha Retirado</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Hora Retirado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mergedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">{item.patent}</TableCell>
                <TableCell align="left">{item.brand}</TableCell>
                <TableCell align="left">{item.model}</TableCell>
                <TableCell align="left">{item.type}</TableCell>
                <TableCell align="left">{item.productionYear}</TableCell>
                <TableCell align="left">{item.motorType}</TableCell>
                <TableCell align="left">{`${item.admissionDateDay}/${item.admissionDateMonth}/2024`}</TableCell>
                <TableCell align="left">{item.admissionHour}</TableCell>
                <TableCell align="left">${item.totalRepairs.toLocaleString('de-DE')}</TableCell>
                <TableCell align="left">${item.totalRecharges.toLocaleString('de-DE')}</TableCell>
                <TableCell align="left">${item.totalDiscounts.toLocaleString('de-DE')}</TableCell>
                <TableCell align="left">${item.subTotal.toLocaleString('de-DE')}</TableCell>
                <TableCell align="left">${item.totalIva.toLocaleString('de-DE')}</TableCell>
                <TableCell align="left">${item.totalAmount.toLocaleString('de-DE')}</TableCell>
                
                <TableCell align="left">
                    {`${item.departureDateDay}/${item.departureDateMonth}/2024`}
                </TableCell>

                <TableCell align="right">{item.departureHour}</TableCell>

                <TableCell align="left">
                    {`${item.clientDateDay}/${item.clientDateMonth}/2024`}
                </TableCell>

                <TableCell align="right">{item.clientHour}</TableCell>

                <TableCell>

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

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
      console.log("Error fetching details:", error);
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
    const merged = repairs.map(repairs => {
      const car = cars.find(c => c.patent === repairs.patent); // Ajusta según la relación entre detalle y car
      return {
        ...repairs,
        brand: car ? car.brand : '',
        model: car ? car.model : '',
        type: car ? car.type : '',
        productionYear: car ? car.productionYear : '',
        motorType: car ? car.motorType : '',
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
        <Link to="/record/add" style={{ textDecoration: "none", marginBottom: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "0.5rem", color: "white", backgroundColor: "#D6589F" }}
            startIcon={<PersonAddIcon />}
          >
            Añadir Historial
          </Button>
        </Link>
        <br /> <br />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Patente</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Marca</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Modelo</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Año Producción</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo Motor</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha Admisión</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Hora Admisión</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Total IVA</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Total Descuentos</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Total Recargos</TableCell>
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
                <TableCell align="left">{item.totalIva}</TableCell>
                <TableCell align="left">{item.totalDiscounts}</TableCell>
                <TableCell align="left">{item.totalRecharges}</TableCell>
                <TableCell align="left">{item.totalAmount}</TableCell>
                
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

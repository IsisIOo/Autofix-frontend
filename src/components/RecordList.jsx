import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import recordService from "../services/record.service";
import detalleService from "../services/detalle.service";
import carService from "../services/car.service";
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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const RepairList = () => {
  const [repairs, setRepairs] = useState([]);
  const [carBrands, setCarBrands] = useState({});
  const [activeBonuses, setActiveBonuses] = useState([]);
  const navigate = useNavigate();

  // Función para inicializar los datos
  const init = async () => {
    try {
      const response = await detalleService.getAll();
      console.log("Mostrando listado de todos los historiales ingresados.", response.data);
      setRepairs(response.data);
      fetchCarBrands(response.data);
      fetchActiveBonuses(response.data);
    } catch (error) {
      console.error("Se ha producido un error al intentar mostrar listado de todos los historiales.", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const fetchCarBrands = (repairs) => {
    const promises = repairs.map(repair =>
      carService.get(repair.patent)
        .then(response => ({ patent: repair.patent, brand: response.data.brand }))
        .catch(error => {
          console.error("Error al obtener la marca del auto:", error);
          return { patent: repair.patent, brand: null };
        })
    );

    Promise.all(promises).then(results => {
      const brandMap = {};
      results.forEach(result => {
        brandMap[result.patent] = result.brand;
      });
      setCarBrands(brandMap);
    });
  };

  const fetchActiveBonuses = (repairs) => {
    const activeBonuses = repairs.reduce((acc, repair) => {
      if (repair.hasBonusApplied) {
        acc.push(repair.patent);
      }
      return acc;
    }, []);
    setActiveBonuses(activeBonuses);
  };

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm("¿Está seguro que desea borrar este historial?");
    if (confirmDelete) {
      detalleService
        .remove(id)
        .then((response) => {
          console.log("Historial ha sido eliminado.", response.data);
          // Llamamos de nuevo a init() después de eliminar
          init();
        })
        .catch((error) => {
          console.error("Se ha producido un error al intentar eliminar al historial", error);
        });
    }
  };

  const handleDetailsCost2 = (patent) => {
    console.log("Printing patent", patent);
    navigate(`/Cost/details-2/${patent}`);
  };

  const handleAddBonus = async (repair) => {
    try {
      // Verificar si el vehículo ya tiene aplicado el bono
      if (activeBonuses.includes(repair.patent)) {
        console.log(`El vehículo con patente ${repair.patent} ya tiene aplicado el bono.`);
        return;
      }

      const updatedRepair = await detalleService.actualizarDESCUENTOMARCA(repair.id);

      if (updatedRepair) {
        // Actualizar el estado local para reflejar los cambios
        setRepairs(prevRepairs =>
          prevRepairs.map(r =>
            r.id === repair.id ? { ...r, totalAmount: updatedRepair.totalAmount, totalDiscounts: updatedRepair.totalDiscounts } : r
          )
        );

        // Marcar el vehículo como que ya tiene aplicado el bono
        setActiveBonuses(prevBonuses => [...prevBonuses, repair.patent]);
      } else {
        console.error("Error al actualizar el registro de reparación.");
        // Manejar el error adecuadamente
      }
    } catch (error) {
      console.error("Error al aplicar el descuento:", error);
      // Manejar el error adecuadamente
    }
  };

  const allowedBrands = ["toyota", "ford", "hyundai", "honda"];

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
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha admisión</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Hora admisión</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Fecha retiro</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Hora retiro</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha retirado</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Hora retirado</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Costo IVA</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Descuentos</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Recargos</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Costo Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell align="left">{repair.patent}</TableCell>
                <TableCell align="left">
                  {`${repair.admissionDateDayName}, ${repair.admissionDateDay}/${repair.admissionDateMonth}/2024`}
                </TableCell>
                <TableCell align="right">{repair.admissionHour}</TableCell>
                <TableCell align="left">
                  {`${repair.departureDateDay}/${repair.departureDateMonth}/2024`}
                </TableCell>
                <TableCell align="right">{repair.departureHour}</TableCell>
                <TableCell align="left">
                  {`${repair.clientDateDay}/${repair.clientDateMonth}/2024`}
                </TableCell>
                <TableCell align="right">{repair.clientHour}</TableCell>
                <TableCell align="right">{repair.totalIva ? `$${repair.totalIva.toLocaleString('de-DE')}` : '-'}</TableCell>
                <TableCell align="right">{repair.totalDiscounts ? `$${repair.totalDiscounts.toLocaleString('de-DE')}` : '$-'}</TableCell>
                <TableCell align="right">{repair.totalRecharges ? `$${repair.totalRecharges.toLocaleString('de-DE')}` : '$-'}</TableCell>
                <TableCell align="right">{repair.totalAmount ? `$${repair.totalAmount.toLocaleString('de-DE')}` : '$-'}</TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleDetailsCost2(repair.patent)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<InfoIcon />}
                  >
                    Detalles
                  </Button>

                  {carBrands[repair.patent] && allowedBrands.includes(carBrands[repair.patent].toLowerCase()) && !activeBonuses.includes(repair.patent) && (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'purple', color: 'white', marginLeft: "0.5rem" }}
                      size="small"
                      onClick={() => handleAddBonus(repair)}
                      startIcon={<MonetizationOnIcon />}
                    >
                      Agregar bono
                    </Button>
                  )}


                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(repair.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
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

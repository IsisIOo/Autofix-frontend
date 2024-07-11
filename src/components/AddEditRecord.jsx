import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import detalleService from "../services/detalle.service";

const AddEditRepair = () => {
  const [patent, setPatent] = useState("");
  const [admissionDateDayName, setAdmissionDateDayName] = useState("");
  const [admissionDateDay, setAdmissionDateDay] = useState("");
  const [admissionDateMonth, setAdmissionDateMonth] = useState("");
  const [admissionHour, setAdmissionHour] = useState("");
  const [repairType, setRepairType] = useState([]);
  const [departureDateDay, setDepartureDateDay] = useState("");
  const [departureDateMonth, setDepartureDateMonth] = useState("");
  const [departureHour, setDepartureHour] = useState("");
  const [clientDateDay, setClientDateDay] = useState("");
  const [clientDateMonth, setClientDateMonth] = useState("");
  const [clientHour, setClientHour] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalDiscounts, setTotalDiscounts] = useState(null);
  const [totalIva, setTotalIva] = useState(null);
  const [totalRecharges, setTotalRecharges] = useState(null);
  const { id } = useParams();
  const [titleRepairForm, setTitleRepairForm] = useState("");
  const navigate = useNavigate();

  const handleRepairTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setRepairType(typeof value === "string" ? value.split(", ") : value);
  };

  const saveRepair = (e) => {
    e.preventDefault();
    const repair = {
      patent,
      admissionDateDayName,
      admissionDateDay,
      admissionDateMonth,
      admissionHour,
      repairType: repairType.join(", "),
      departureDateDay,
      departureDateMonth,
      departureHour,
      clientDateDay,
      clientDateMonth,
      clientHour,
      id,
    };

    if (id) {
      detalleService.update(repair)
        .then((response) => {
          console.log("Historial ha sido actualizado.", response.data);
          navigate("/record/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar actualizar datos del historial.", error);
        });
    } else {
      detalleService.newrepair(repair)
        .then((response) => {
          console.log("Historial ha sido añadido.", response.data);
          navigate("/record/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar crear nuevo historial.", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleRepairForm("Editar Historial");
      detalleService.getOneRepair(id)
        .then((repair) => {
          setPatent(repair.data.patent);
          setAdmissionDateDayName(repair.data.admissionDateDayName);
          setAdmissionDateDay(repair.data.admissionDateDay);
          setAdmissionDateMonth(repair.data.admissionDateMonth);
          setAdmissionHour(repair.data.admissionHour);
          setDepartureDateDay(repair.data.departureDateDay);
          setDepartureDateMonth(repair.data.departureDateMonth);
          setDepartureHour(repair.data.departureHour);
          setClientDateDay(repair.data.clientDateDay);
          setClientDateMonth(repair.data.clientDateMonth);
          setClientHour(repair.data.clientHour);
          setTotalAmount(repair.data.totalAmount || null);
          setTotalDiscounts(repair.data.totalDiscounts || null);
          setTotalIva(repair.data.totalIva || null);
          setTotalRecharges(repair.data.totalRecharges || null);
          setRepairType(repair.data.repairType.split(", "));
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleRepairForm("Nuevo Historial");
    }
  }, [id]);

  const repairOptions = [
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

  return (
    <Paper style={{ padding: "2rem" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h3>{titleRepairForm}</h3>
        <form onSubmit={saveRepair}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="patent"
                label="Patente"
                value={patent}
                variant="standard"
                fullWidth
                onChange={(e) => setPatent(e.target.value)}
                helperText="Ej. ABCD12"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="admissionDateDayName"
                label="Día de admisión"
                value={admissionDateDayName}
                select
                variant="standard"
                fullWidth
                onChange={(e) => setAdmissionDateDayName(e.target.value)}
              >
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="admissionDateDay"
                label="Día de admisión"
                value={admissionDateDay}
                select
                variant="standard"
                fullWidth
                onChange={(e) => setAdmissionDateDay(e.target.value)}
              >
                {[...Array(31)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="admissionDateMonth"
                label="Mes de admisión"
                value={admissionDateMonth}
                select
                variant="standard"
                fullWidth
                onChange={(e) => setAdmissionDateMonth(e.target.value)}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="admissionHour"
                label="Hora de admisión"
                value={admissionHour}
                variant="standard"
                fullWidth
                onChange={(e) => setAdmissionHour(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="departureDateDay"
                label="Día de retiro"
                value={departureDateDay}
                select
                variant="standard"
                fullWidth
                onChange={(e) => setDepartureDateDay(e.target.value)}
              >
                {[...Array(31)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="departureDateMonth"
                label="Mes de retiro"
                value={departureDateMonth}
                select
                variant="standard"
                fullWidth
                onChange={(e) => setDepartureDateMonth(e.target.value)}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="departureHour"
                label="Hora de retiro"
                value={departureHour}
                variant="standard"
                fullWidth
                onChange={(e) => setDepartureHour(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="clientDateDay"
                label="Día del cliente"
                value={clientDateDay}
                select
                variant="standard"
                fullWidth
                onChange={(e) => setClientDateDay(e.target.value)}
              >
                {[...Array(31)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="clientDateMonth"
                label="Mes del cliente"
                value={clientDateMonth}
                select
                variant="standard"
                fullWidth
                onChange={(e) => setClientDateMonth(e.target.value)}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="clientHour"
                label="Hora del cliente"
                value={clientHour}
                variant="standard"
                fullWidth
                onChange={(e) => setClientHour(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="repairType-label">Tipo de reparación</InputLabel>
                <Select
                  id="repairType"
                  labelId="repairType-label"
                  multiple
                  value={repairType}
                  variant="standard"
                  onChange={handleRepairTypeChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {repairOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={repairType.indexOf(option) > -1} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                type="submit"
                fullWidth
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
};

export default AddEditRepair;

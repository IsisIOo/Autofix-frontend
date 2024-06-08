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
import detalleService from "../services/detalle.service";

const AddEditRepair = () => {
  const [patent, setPatent] = useState("");
  const [admissionDateDayName, setAdmissionDateDayName] = useState("");
  const [admissionDateDay, setAdmissionDateDay] = useState("");
  const [admissionDateMonth, setAdmissionDateMonth] = useState("");
  const [admissionHour, setAdmissionHour] = useState("");
  const [repairType, setRepairType] = useState([]); // Asegurarse de que sea un array
  const [departureDateDay, setDepartureDateDay] = useState("");
  const [departureDateMonth, setDepartureDateMonth] = useState("");
  const [departureHour, setDepartureHour] = useState("");
  const [clientDateDay, setClientDateDay] = useState("");
  const [clientDateMonth, setClientDateMonth] = useState("");
  const [clientHour, setClientHour] = useState("");
  const [category, setCategory] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  
  //nuevos
  const [totalDiscounts , setToalDiscounts] = useState(null);
  const [totalIva, setTotalIva] = useState(null);
  const [totalRecharges, setTotalRecharges] = useState(null);
  //
  const { id } = useParams();
  const [titleRepairForm, setTitleRepairForm] = useState("");
  const navigate = useNavigate();


  // Función para manejar el cambio en los tipos de reparación seleccionados NO BORRAR
  const handleRepairTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setRepairType(
      // Asegurarse de que value es siempre un array
      typeof value === "string" ? value.split(", ") : value
    );
  };

  // Función para guardar el registro
  const saveRepair = (e) => {
    e.preventDefault();
    const repair = {
      patent,
      admissionDateDayName,
      admissionDateDay,
      admissionDateMonth,
      admissionHour,
      repairType: repairType.join(", "), // Convertir el array a una cadena para guardarlo
      departureDateDay,
      departureDateMonth,
      departureHour,
      clientDateDay,
      clientDateMonth,
      clientHour,
      id,
    };
    console.log(repair);



    if (id) {
      // Actualizar Datos, la verdad ahora no existe
      repairService.update(repair)
        .then((response) => {
          console.log("Historial ha sido actualizado.", response.data);
          navigate("/record/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar actualizar datos del historial.", error);
        });
    } else {
      // Crear nuevo empleado
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


    // Función para guardar el detalle
    const saveDetalle = (o) => {
      o.preventDefault();
      const detalle = {
        patent,
        admissionDateDay,
        admissionDateMonth,
        admissionHour,
        repairType: repairType.join(", "), // Convertir el array a una cadena para guardarlo
        id,
      };
      console.log(detalle);
  
      detalleService.newdetalle(detalle)
        .then((response) => {
          console.log("Detalle ha sido añadido.", response.data);
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar crear el detalle.", error);
        });
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
          setToalDiscounts(repair.data.totalDiscounts || null);
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
    "Reparación del Sistema de Aire Acondicionado y Calefaccion",
    "Reparaciones del Sistema de Combustible",
    "Reparacion y Reemplazo del Parabrisas y Cristales",
  ];

  return (
    <Paper>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <h3>{titleRepairForm}</h3>
        <form>
          <FormControl fullWidth>
            <TextField
              id="patent"
              label="Patente"
              value={patent}
              variant="standard"
              style={{ width: "25%" }}
              onChange={(e) => setPatent(e.target.value)}
              helperText="Ej. ABC123"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="admissionDateDayName"
              label="Dia admisión"
              value={admissionDateDayName}
              select
              variant="standard"
              onChange={(e) => setAdmissionDateDayName(e.target.value)}
              style={{ width: "25%" }}
            >
              <MenuItem value={"Lunes"}>Lunes</MenuItem>
              <MenuItem value={"Martes"}>Martes</MenuItem>
              <MenuItem value={"Miércoles"}>Miércoles</MenuItem>
              <MenuItem value={"Jueves"}>Jueves</MenuItem>
              <MenuItem value={"Viernes"}>Viernes</MenuItem>
              <MenuItem value={"Sábado"}>Sábado</MenuItem>
              <MenuItem value={"Domingo"}>Domingo</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="admissionDateDay"
              label="Dia admisión"
              value={admissionDateDay}
              select
              variant="standard"
              onChange={(e) => setAdmissionDateDay(e.target.value)}
              style={{ width: "25%" }}
            >
              {[...Array(31)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="admissionDateMonth"
              label="Mes admisión"
              value={admissionDateMonth}
              select
              variant="standard"
              onChange={(e) => setAdmissionDateMonth(e.target.value)}
              style={{ width: "25%" }}
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          
          <FormControl fullWidth>
            <TextField
              id="admissionHour"
              label="Hora de admisión"
              value={admissionHour}
              style={{ width: "25%" }}
              variant="standard"
              onChange={(e) => setAdmissionHour(e.target.value)}
            />
          </FormControl>



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
              style={{ width: "75%", fontSize: '0.875rem' }}
            >
              {repairOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={repairType.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl fullWidth>
            <TextField
              id="departureDateDay"
              label="Dia retiro"
              value={departureDateDay}
              select
              variant="standard"
              onChange={(e) => setDepartureDateDay(e.target.value)}
              style={{ width: "25%" }}
            >
              {[...Array(31)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="departureDateMonth"
              label="Mes retiro"
              value={departureDateMonth}
              select
              variant="standard"
              onChange={(e) => setDepartureDateMonth(e.target.value)}
              style={{ width: "25%" }}
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="departureHour"
              label="Hora retiro"
              value={departureHour}
              style={{ width: "25%" }}
              variant="standard"
              onChange={(e) => setDepartureHour(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="clientDateDay"
              label="Dia cliente"
              value={clientDateDay}
              select
              variant="standard"
              onChange={(e) => setClientDateDay(e.target.value)}
              style={{ width: "25%" }}
            >
              {[...Array(31)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="clientDateMonth"
              label="Mes cliente"
              value={clientDateMonth}
              select
              variant="standard"
              onChange={(e) => setClientDateMonth(e.target.value)}
              style={{ width: "25%" }}
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="clientHour"
              label="Hora cliente"
              value={clientHour}
              style={{ width: "25%" }}
              variant="standard"
              onChange={(e) => setClientHour(e.target.value)}
            />
          </FormControl>


          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={saveRepair}
          >
            Guardar
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default AddEditRepair;

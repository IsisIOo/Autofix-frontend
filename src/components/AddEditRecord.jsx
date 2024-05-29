import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import recordService from "../services/record.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Paper from "@mui/material/Paper";
import carService from "../services/car.service";
import InfoIcon from '@mui/icons-material/Info';

const AddEditRecord = () => {
  const [patent, setPatent] = useState("");
  const [admissionDateDayName, setAdmissionDateDayName] = useState("");
  const [admissionDateDay, setAdmissionDateDay] = useState("");
  const [admissionDateMonth, setAdmissionDateMonth] = useState("");
  const [admissionHour, setAdmissionHour] = useState("");
  const [repairType, setRepairType] = useState("");
  const [departureDateDay, setDepartureDateDay] = useState("");
  const [departureDateMonth, setDepartureDateMonth] = useState("");
  const [departureHour, setDepartureHour] = useState("");
  const [clientDateDay, setClientDateDay] = useState("");
  const [clientDateMonth, setClientDateMonth] = useState("");
  const [clientHour, setClientHour] = useState("");
  const [category, setCategory] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const { id } = useParams();
  const [titleRecordForm, setTitleRecordForm] = useState("");
  const navigate = useNavigate();


  const saveRecord = (e) => {
    e.preventDefault();
  
        const record = { patent, admissionDateDayName, admissionDateDay, admissionDateMonth, admissionHour, repairType,  departureDateDay, departureDateMonth, departureHour, clientDateDay, clientDateMonth, clientHour, id };
        console.log(record);
  
        if (id) {
          //Actualizar Datos 
          recordService
            .update(record)
            .then((response) => {
              console.log("Historial ha sido actualizado.", response.data);
              navigate("/record/list");
            })
            .catch((error) => {
              console.log(
                "Ha ocurrido un error al intentar actualizar datos del historial.",
                error
              );
            });
        } else {
          //Crear nuevo empleado
          recordService
            .newrecord(record)
            .then((response) => {
              console.log("Historial ha sido añadido.", response.data);
              navigate("/record/list");
            })
            .catch((error) => {
              console.log(
                "Ha ocurrido un error al intentar crear nuevo historial.",
                error
              );
            });
        }
  };


  useEffect(() => {
    if (id) {
      setTitleRecordForm("Editar Historial");
      recordService
        .get(id)
        .then((record) => {
          setPatent(record.data.patent);
          setadmissionDateDayName(record.data.admissionDateDayName);
          setadmissionDateDay(record.data.admissionDateDay);
          setadmissionDateMonth(record.data.admissionDateMonth);
          setadmissionHour(record.data.admissionHour);
          setrepairType(record.data.repairType);
          //fecha en la que debe irse
          setdepartureDateDay(record.data.departureDateDay);
          setdepartureDateMonth(record.data.departureDateMonth);
          setdepartureHour(record.data.departureHour);
          //fecha en el que se lo llevan
          setclientDateDay(record.data.clientDateDay);
          setclientDateMonth(record.data.clientDateMonth);
          setclientHour(record.data.clientHour);
          setTotalAmount(null);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleRecordForm("Nuevo Historial");
    }
  }, []);

  return (
    <Paper >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <h3> {titleRecordForm} </h3>

      <form>
        <FormControl fullWidth>
          <TextField
            id="patent"
            label="Patente"
            value={patent}
            variant="standard"
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
            <MenuItem value={"Miercoles"}>Miercoles</MenuItem>
            <MenuItem value={"Jueves"}>Jueves</MenuItem>
            <MenuItem value={"Viernes"}>Viernes</MenuItem>
            <MenuItem value={"Sabado"}>Sabado</MenuItem>
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
          
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={17}>17</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={22}>22</MenuItem>
            <MenuItem value={23}>23</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={26}>26</MenuItem>
            <MenuItem value={27}>27</MenuItem>
            <MenuItem value={28}>28</MenuItem>
            <MenuItem value={29}>29</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={31}>31</MenuItem>
          </TextField >
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
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </TextField >
        </FormControl>



        <FormControl fullWidth>
          <TextField
            id="admissionHour"
            label="Hora de admisión"
            value={admissionHour}
            variant="standard"
            onChange={(e) => setAdmissionHour(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="repairType"
            label="Tipo de reparacion" 
            value={repairType}
            select
            variant="standard"
            onChange={(e) => setRepairType(e.target.value)}
            style={{ width: "25%" }}
            
          >
          
            <MenuItem value={"Reparaciones del Sistema de Frenos"}>Reparaciones del Sistema de Frenos</MenuItem>
            <MenuItem value={"Servicio del Sistema de Refrigeración"}>Servicio del Sistema de Refrigeración</MenuItem>
            <MenuItem value={"Reparaciones del Motor"}>Reparaciones del Motor</MenuItem>
            <MenuItem value={"Reparaciones de la transmisión"}>Reparaciones de la transmisión</MenuItem>
            <MenuItem value={"Reparación del Sistema Eléctrico"}>Reparación del Sistema Eléctrico</MenuItem>
            <MenuItem value={"Reparaciones del Sistema de Escape"}>Reparaciones del Sistema de Escape</MenuItem>
            <MenuItem value={"Reparación de Neumáticos y Ruedas"}>Reparación de Neumáticos y Ruedas</MenuItem>
            <MenuItem value={"Reparaciones de la Suspensión y la Dirección"}>Reparaciones de la Suspensión y la Dirección</MenuItem>
            <MenuItem value={"Reparación del Sistema de Aire Acondicionado y Calefacción"}>Reparación del Sistema de Aire Acondicionado y Calefacción</MenuItem>
            <MenuItem value={"Reparaciones del Sistema de Combustible"}>Reparaciones del Sistema de Combustible</MenuItem>
            <MenuItem value={"Reparación y Reemplazo del Parabrisas y Cristales"}>Reparación y Reemplazo del Parabrisas y Cristales</MenuItem>
          </TextField >
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
          
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={17}>17</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={22}>22</MenuItem>
            <MenuItem value={23}>23</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={26}>26</MenuItem>
            <MenuItem value={27}>27</MenuItem>
            <MenuItem value={28}>28</MenuItem>
            <MenuItem value={29}>29</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={31}>31</MenuItem>
          </TextField >
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
          
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </TextField >
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="departureHour"
            label="Hora de retiro"
            value={departureHour}
            variant="standard"
            onChange={(e) => setDepartureHour(e.target.value)}
          />
        </FormControl>



        <FormControl fullWidth>
          <TextField
            id="clientDateDay"
            label="Dia retirado"
            value={clientDateDay}
            variant="standard"
            onChange={(e) => setClientDateDay(e.target.value)}

          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="clientDateMonth"
            label="Mes retirado"
            value={clientDateMonth}
            variant="standard"
            onChange={(e) => setClientDateMonth(e.target.value)}

          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
          id="clientHour"
          label="Hora retirado"
          value={clientHour}
          variant="standard"
          onChange={(e) => setClientHour(e.target.value)}

          />
        </FormControl>









        <FormControl>
          <br />
          <Button 
            variant="contained"
            //color="info"
            onClick={(e) => saveRecord(e)}
            style={{ marginLeft: "0.5rem", color  : "white", backgroundColor: "#D6589F"}}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
        
      </form>
      <hr />
      <Link to="/record/list">Back to List</Link>
    </Box>
    </Paper>
  );
};

export default AddEditRecord;

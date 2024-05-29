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
import costService from "../services/cost.service";

const AddEditTime = () => {
  const [patent, setPatent] = useState("");
  const { id } = useParams();
  const [titleCostForm, setTitleCostForm] = useState("");
  const navigate = useNavigate();


  const ponerTiempo = (e) => {
    e.preventDefault();
        const cost = { patent, id };
        console.log(cost);
  
        if (id) {
          //Actualizar Datos 
          costService.update(cost)
            .then((response) => {
              console.log("Costos ticket ha sido actualizado.", response.data);
            })
            .catch((error) => {
              console.log(
                "Ha ocurrido un error al intentar actualizar datos del tickets.",
                error
              );
            });
        } else {
          //Crear nuevo empleado
          costService
            .time(patent) //PONER FUNCION QUE RETORNE EL TIEMPO DE REPARACION, retorna el tiempo
            .then((response) => {
              console.log("Tiempo ha sido añadido.", response.data);
              navigate("/list/time");
            })
            .catch((error) => {
              console.log(
                "Ha ocurrido un error al intentar crear nuevo Tiempo.",
                error
              );
            });
        }
  };


  useEffect(() => {
    if (id) {
      setTitleCostForm("Editar Ticket");
      costService
        .get(id)
        .then((cost) => {
          setPatent(cost.data.patent);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleCostForm("Nueva Boleta");
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
      <h3> {titleCostForm} </h3>

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

        <FormControl>
          <br />
          <Button 
            variant="contained"
            //color="info"
            onClick={(e) => ponerTiempo(e)}
            style={{ marginLeft: "0.5rem", color  : "white", backgroundColor: "#D6589F"}}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
        
      </form>
      <hr />
      <Link to="/list/time">Back to List</Link>
    </Box>
    </Paper>
  );
};

export default AddEditTime;

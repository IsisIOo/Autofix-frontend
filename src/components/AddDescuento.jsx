import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import descuentoService from "../services/descuento.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import SaveIcon from "@mui/icons-material/Save";

const AddEditDescuento = () => {
  const [toyotaAmount, setToyotaAmount] = useState("");
  const [toyotanumber, setToyotanumber] = useState("");
  const [fordAmount, setFordAmount] = useState("");
  const [fordnumber, setFordnumber] = useState("");
  const [hondaAmount, sethondaAmount] = useState("");
  const [hondanumber, sethondanumber] = useState("");
  const [hyundaiAmount, sethyundaiAmount] = useState("");
  const [hyundainumber, sethyundainumber] = useState("");
  const [titleDescuentoForm, setTitleDescuentoForm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const saveDescuento = (e) => {
    e.preventDefault();

    const descuento = {
      id,
      toyotaAmount,
      toyotanumber,
      fordAmount,
      fordnumber,
      hondaAmount,
      hondanumber,
      hyundaiAmount,
      hyundainumber,
    };
    console.log(descuento);

    if (id) {
      // Actualizar Datos
      descuentoService
        .update(descuento)
        .then((response) => {
          console.log("Descuento ha sido actualizado.", response.data);
          navigate("/repair-list/discount");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del descuento.",
            error
          );
        });
    } else {
      // Crear nuevo
      descuentoService
        .create(descuento)
        .then((response) => {
          console.log("Descuento ha sido añadido.", response.data);
          navigate("/repair-list/discount");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo descuento.",
            error
          );
        });
    }
  };

  return (
    <Container maxWidth="lg" style={{ height: "100vh" }}>
      <Paper style={{ height: "100%", overflow: "auto" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "200px", width: "200px" }}
        >
          <h1>Gestión de Descuentos</h1>
          <h3>{titleDescuentoForm}</h3>

          <form>
            <FormControl style={{ width: "100%" }}>
              <TextField
                id="toyotaAmount"
                label="Descuento a Toyota"
                value={toyotaAmount}
                variant="standard"
                onChange={(e) => setToyotaAmount(e.target.value)}
                helperText="Ej. 50000"
              />

              <TextField
                id="toyotanumber"
                label="Cantidad de Toyota"
                type="number"
                value={toyotanumber}
                variant="standard"
                onChange={(e) => setToyotanumber(e.target.value)}
              />

              <TextField
                id="fordAmount"
                label="Descuento bonos Ford"
                value={fordAmount}
                variant="standard"
                onChange={(e) => setFordAmount(e.target.value)}
                helperText="Ej. 50000"
              />

              <TextField
                id="fordnumber"
                label="Cantidad bonos Ford"
                type="number"
                value={fordnumber}
                variant="standard"
                onChange={(e) => setFordnumber(e.target.value)}
              />

              <TextField
                id="hyundaiAmount"
                label="Descuento bonos Hyundai"
                value={hyundaiAmount}
                variant="standard"
                onChange={(e) => sethyundaiAmount(e.target.value)}
                helperText="Ej. 50000"
              />

              <TextField
                id="hyundainumber"
                label="Cantidad bonos Hyundai"
                type="number"
                value={hyundainumber}
                variant="standard"
                onChange={(e) => sethyundainumber(e.target.value)}
              />

              <TextField
                id="hondaAmount"
                label="Descuento bonos Honda"
                value={hondaAmount}
                variant="standard"
                onChange={(e) => sethondaAmount(e.target.value)}
                helperText="Ej. 50000"
              />

              <TextField
                id="hondanumber"
                label="Cantidad bonos Honda"
                type="number"
                value={hondanumber}
                variant="standard"
                onChange={(e) => sethondanumber(e.target.value)}
              />

              <br />
              <Button
                variant="contained"
                color="info"
                onClick={(e) => saveDescuento(e)}
                style={{
                  marginLeft: "0.5rem",
                  color: "white",
                  backgroundColor: "#D6589F",
                }}
                startIcon={<SaveIcon />}
              >
                Grabar
              </Button>
            </FormControl>
          </form>
          <hr />
          <Link to="/repair-list/discount">Back to List</Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddEditDescuento;

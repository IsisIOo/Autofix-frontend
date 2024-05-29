import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DiscountIcon from "@mui/icons-material/Discount";
import HailIcon from "@mui/icons-material/Hail";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => navigate("/car/list")}>
          <ListItemIcon>
            <DirectionsCarIcon/>
          </ListItemIcon>
          <ListItemText primary="Registro de Autos" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/record/list")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Historial de autos" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/cost/list")}>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Planilla de Costos" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/list/type")}>
          <ListItemIcon>
            <ElectricCarIcon />
          </ListItemIcon>
          <ListItemText primary="Repacion vs Motor" />
        </ListItemButton>
        
        <ListItemButton onClick={() => navigate("/list/time")}>
          <ListItemIcon>
            <ScheduleIcon/>
          </ListItemIcon>
          <ListItemText primary="Tiempo espera" />
        </ListItemButton>
        
        <ListItemButton onClick={() => navigate("/list/reparacion")}>
          <ListItemIcon>
            <ConstructionIcon/>
          </ListItemIcon>
          <ListItemText primary="Cantidad reparaciones" />
        </ListItemButton>


      </List>

    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}

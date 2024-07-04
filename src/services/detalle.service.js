import httpDetalle from "../http-common";
import httpRepair from "../http-common";

const getAll = () => {
    return httpRepair.get('/api/repairs/');
}

const getOneDetalle = patent => {
    return httpDetalle.get(`/api/detail/patent1/${patent}`);
}

const getOneRepair = patent => {
    return httpRepair.get(`/api/repairs/repair-patent/${patent}`);
}

//para los detalles de la reparacion
const getOneRepairPORID = id => {
    return httpRepair.get(`/api/repairs/repair-id/${id}`);
}


const newrepair = data => {
    return httpRepair.post("/api/repairs/newRepair/", data);
}

const newdetalle = data => {
    return httpDetalle.post("/api/detail/newDetail/", data);
}

const actualizarDESCUENTOMARCA = () => {
    return httpRepair.post("/api/repairs/updateRepairBONOMARCA/");
}

const remove = id => {
    return httpRepair.delete(`/api/repairs/repair-id/${id}`);
}


export default { getAll, newrepair, remove, newdetalle, getOneDetalle, getOneRepair, getOneRepairPORID, actualizarDESCUENTOMARCA};
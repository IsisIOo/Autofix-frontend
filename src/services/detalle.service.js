import httpDetalle from "../http-common";
import httpRepair from "../http-common";

const getAll = () => {
    return httpRepair.get('/api/repair/');
}

const getOneDetalle = patent => {
    return httpDetalle.get(`/api/detail/patent1/${patent}`);
}

const getOneRepair = patent => {
    return httpRepair.get(`/api/repair/repair-patent/${patent}`);
}

const newrepair = data => {
    return httpRepair.post("/api/repair/newRepair/", data);
}

const newdetalle = data => {
    return httpDetalle.post("/api/detail/newDetail/", data);
}

const remove = id => {
    return httpRecord.delete(`/api/repair/repair-id/${id}`);
}


export default { getAll, newrepair, remove, newdetalle, getOneDetalle, getOneRepair};
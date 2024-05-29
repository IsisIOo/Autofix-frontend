import httpCar from "../http-common";
import httpRepair from "../http-common";


const getAll = () => {
    return httpRepair.get('/api/v1/repairs/');
}


//desde aQUI SON IMPORTANTES
const CALCULATODO = patent => {
    return httpRepair.post(`/api/v1/repairs/${patent}`);
}

//obitene todos los repairs asociado a un solo auto
const getAllrepairs1 = patent => {
    return httpRepair.get(`/api/v1/repairs/all/${patent}`);
}

const remove = id => {
    return httpRepair.delete(`/api/v1/repairs/delete/${id}`);
}



export default { getAll, remove, getAllrepairs1, CALCULATODO };
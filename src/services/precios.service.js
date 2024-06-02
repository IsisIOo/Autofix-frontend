import httpPrecios from "../http-common";

const getAll = () => {
    return httpPrecios.get('/api/repair-list/');
}

const create = data => {
    return httpPrecios.post("/api/repair-list/", data);
}

//const get = patent => {
//    return httpPrecios.get(`/api/car/patent/${patent}`);
//}

const update = data => {
    return httpPrecios.put('/api/car/', data);
}

const remove = id => {
    return httpPrecios.delete(`/api/repair-list/delete/${id}`);
}


export default { getAll, create, get, update, remove };
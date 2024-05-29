import httpCar from "../http-common";

const getAll = () => {
    return httpCar.get('/api/car/');
}

const create = data => {
    return httpCar.post("/api/car/", data);
}

const get = patent => {
    return httpCar.get(`/api/car/patent/${patent}`);
}

const update = data => {
    return httpCar.put('/api/car/', data);
}

const remove = id => {
    return httpCar.delete(`/api/car/delete/${id}`);
}


export default { getAll, create, get, update, remove };
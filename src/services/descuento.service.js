import httpDescuento from "../http-common";
//este es el de pep 2, donde estan los precios guardados en db

const getAll = () => {
    return httpDescuento.get('/api/descuento/');
}

const create = data => {
    return httpDescuento.post("/api/descuento/", data);
}

//const get = patent => {
//    return httpDescuento.get(`/api/car/patent/${patent}`);
//}


const remove = id => {
    return httpDescuento.delete(`/api/descuento/delete/${id}`);
}


export default { getAll, create, remove };
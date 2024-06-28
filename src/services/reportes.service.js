import httpReportes from "../http-common";


//obtiene todos los repairs, hay que cambiarlo por detalleservice.getall
const getAll = () => {
    return httpReportes.get('/api/reportes/');
}

//obtiene todos los car
const getAllCar = () => {
    return httpReportes.get('/api/reportes/car/');
}

export default { getAll, getAllCar };
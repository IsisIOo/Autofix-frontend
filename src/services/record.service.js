import httpRecord from "../http-common";


const getAll = () => {
    return httpRecord.get('/api/repairs/');
}

const create = data => {
    return httpRecord.post("/api/repair/", data);
}

const get = patent => {
    return httpRecord.get(`/api/v1/record/patent1/${patent}`);
}

const update = data => { //put cost en record, en realidad creo que edita
    return httpRecord.put('/api/v1/patent-put/${patent}', data);
}

const remove = id => {
    return httpRecord.delete(`/api/v1/record/${id}`);
}


const newrecord = data => {
    return httpRecord.post("/api/v1/record/newRecord/", data);
}


export default { getAll, create, get, update, remove, newrecord };
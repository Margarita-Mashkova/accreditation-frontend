import axios from "axios";

const OPOP_API_BASE_URL = "http://localhost:9000/opop"

class OpopService {
    //GET
    findAllOpops(){
        let URL = OPOP_API_BASE_URL
        return axios.get(URL)
    }

    findOpop(id){
        let URL = OPOP_API_BASE_URL + '/' + id
        return axios.get(URL)
    }

    //PUT
    editOpop(id, name, userId){
        let URL = OPOP_API_BASE_URL + "/" + id + "?name=" + name + "&userId=" + userId
        return axios.put(URL)
    }

    //POST
    createOpop(name, userId){
        let URL = OPOP_API_BASE_URL + "?name=" + name + "&userId=" + userId
        return axios.post(URL)
    }

    //DELETE
    deleteOpop(id){
        let URL = OPOP_API_BASE_URL + '/' + id
        return axios.delete(URL)
    }

    deleteAllOpops(){
        let URL = OPOP_API_BASE_URL
        return axios.delete(URL)
    }
}

export default new OpopService()
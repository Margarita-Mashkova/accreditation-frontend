import axios from "axios";

const OPOP_API_BASE_URL = "http://localhost:9000/opop"

class OpopService {
    //GET
    findAllOpops(){
        let URL = OPOP_API_BASE_URL
        return axios.get(URL)
    }

    findAllOpopsByPage(pageNumber){
        let URL = OPOP_API_BASE_URL + '/page?pageNumber=' + pageNumber
        return axios.get(URL)
    }

    getAmountPages(){
        let URL = OPOP_API_BASE_URL + '/pages'
        return axios.get(URL)
    }

    findAllOpopsLevels(){
        let URL = OPOP_API_BASE_URL + '/levels'
        return axios.get(URL)
    }

    findOpop(id){
        let URL = OPOP_API_BASE_URL + '/' + id
        return axios.get(URL)
    }

    //PUT
    editOpop(id, name, level, userId){
        let URL = OPOP_API_BASE_URL + "/" + id + "?name=" + name + "&level=" + level + "&userId=" + userId
        return axios.put(URL)
    }

    //POST
    createOpop(name, level, userId){
        let URL = OPOP_API_BASE_URL + "?name=" + name + "&level=" + level + "&userId=" + userId
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
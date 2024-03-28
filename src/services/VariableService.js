import axios from 'axios'

const VARIABLE_API_BASE_URL = 'http://localhost:9000/variable'

class VariableService{
    //GET
    findAllVariables(){
        let URL = VARIABLE_API_BASE_URL
        return axios.get(URL)
    }

    findVariable(key){
        let URL = VARIABLE_API_BASE_URL + '/' + key
        return axios.get(URL)
    }

    //POST
    createVariable(variable){
        let URL = VARIABLE_API_BASE_URL
        return axios.post(URL, variable)
    }

    //PUT
    editVariable(key, name){
        let URL = VARIABLE_API_BASE_URL + "/" + key + "?name=" + name
        return axios.put(URL)
    }

    //DELETE
    deleteVariable(key){
        let URL = VARIABLE_API_BASE_URL + '/' + key
        return axios.delete(URL)
    }

    deleteAllVariables(){
        let URL = VARIABLE_API_BASE_URL
        return axios.delete(URL)
    }
}

export default new VariableService()
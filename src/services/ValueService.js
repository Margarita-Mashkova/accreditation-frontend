import axios from 'axios'

const VALUE_API_BASE_URL = 'http://localhost:9000/value'

class ValueService{
    //GET
    findAllValues(){
        let URL = VALUE_API_BASE_URL + '/all'
        return axios.get(URL)
    }

    findValue(opopId, variableKey, date){
        let URL = VALUE_API_BASE_URL + '/filtered?opopId' + opopId + '&variableKey=' + variableKey + '&date=' + date 
        return axios.get(URL)
    }

    findValuesByOpopAndDate(opopId, date){
        let URL = VALUE_API_BASE_URL + '/filtered?opopId=' + opopId + '&date=' + date 
        return axios.get(URL)
    }

    findDatesByOpop(opopId){
        let URL = VALUE_API_BASE_URL + '/by-opop?opopId=' + opopId
        return axios.get(URL)
    }

    //POST
    addValuesList(valuesList){
        let URL = VALUE_API_BASE_URL + '/list'
        return axios.post(URL, valuesList)
    }

    //PUT
    editValue(value){
        let URL = VALUE_API_BASE_URL
        return axios.put(URL, value)
    }

    //DELETE
    deleteValue(value){
        let URL = VALUE_API_BASE_URL
        return axios.delete(URL, value)
    }

    deleteAllValues(){
        let URL = VALUE_API_BASE_URL + '/all'
        return axios.delete(URL)
    }
}
export default new ValueService()

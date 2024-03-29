import axios from "axios"

const INDICATOR_API_BASE_URL = 'http://localhost:9000/indicator'

class IndicatorService{
    //GET
    findAllIndicators(){
        let URL = INDICATOR_API_BASE_URL
        return axios.get(URL)
    }

    findIndicator(key){
        let URL = INDICATOR_API_BASE_URL + '/' + key
        return axios.get(URL)
    }

    //POST
    createIndicator(indicator){
        let URL = INDICATOR_API_BASE_URL
        return axios.post(URL, indicator)
    }

    //PUT
    editIndicator(indicator){
        let URL = INDICATOR_API_BASE_URL
        return axios.put(URL, indicator)
    }

    //DELETE
    deleteIndicator(key){
        let URL = INDICATOR_API_BASE_URL + '/' + key
        return axios.delete(URL)
    }

    deleteAllIndicators(){
        let URL = INDICATOR_API_BASE_URL
        return axios.delete(URL)
    }

}

export default new IndicatorService()
import axios from "axios";

const CALCULATION_API_BASE_URL = "http://localhost:9000/calculation";

class CalculationService {
    //GET
    findCalculationsByOpopAndDate(opopId, date){
        let URL = CALCULATION_API_BASE_URL + '/filtered?opopId=' + opopId + '&date=' + date 
        return axios.get(URL)
    }

    findCalculationsByPeriod(opopId, dateStart, dateEnd){
        let URL = CALCULATION_API_BASE_URL + '/analysis?opopId=' + opopId + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd 
        return axios.get(URL)
    }
}

export default new CalculationService();

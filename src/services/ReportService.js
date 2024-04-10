import axios from "axios";

const REPORT_API_BASE_URL = "http://localhost:9000/report";

class ReportService {
    //GET
    makeCalculationReport(opopId, date){
        let URL = REPORT_API_BASE_URL + '?opopId=' + opopId + '&date=' + date 
        return axios.get(URL)
    }
}

export default new ReportService();

import axios from "axios";

const REPORT_API_BASE_URL = "http://localhost:9000/report";

class ReportService {
    //GET
    makeCalculationOpopReport(opopId, date){
        let URL = REPORT_API_BASE_URL + '/calculation-opop?opopId=' + opopId + '&date=' + date 
        return axios.get(URL)
    }
    saveCalculationOpopReportExcel(opopId, date){
        let URL = REPORT_API_BASE_URL + '/calculation-opop/save?opopId=' + opopId + '&date=' + date 
        return axios.get(URL)
    }

    makeAnalysisReport(opopId, dateStart, dateEnd){
        let URL = REPORT_API_BASE_URL + '/analysis?opopId=' + opopId + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd
        return axios.get(URL)
    }
    saveAnalysisReportExcel(opopId, dateStart, dateEnd){
        let URL = REPORT_API_BASE_URL + '/analysis/save?opopId=' + opopId + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd
        return axios.get(URL)
    }
}

export default new ReportService();

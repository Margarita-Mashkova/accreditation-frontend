import axios from "axios";

const OPOP_API_BASE_URL = "http://localhost:9000/opop";

class OpopService {
    //GET
    findAllOpops(){
        let URL = OPOP_API_BASE_URL
        return axios.get(URL)
    }
}

export default new OpopService();

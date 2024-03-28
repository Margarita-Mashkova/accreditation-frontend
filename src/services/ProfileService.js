import axios from 'axios'

const PROFILE_API_BASE_URL = 'http://localhost:9000'

class ProfileService{
     //GET
     me() {
        let URL = PROFILE_API_BASE_URL + '/me'
        return axios.get(URL)
    }

    //POST
    login(user){
        let URL = PROFILE_API_BASE_URL+'/auth'
        return axios.post(URL, user)
    }

    //PUT
    editProfile(user) {
        let URL = PROFILE_API_BASE_URL + '/edit-profile'
        return axios.put(URL, user)
    }
}

export default new ProfileService()
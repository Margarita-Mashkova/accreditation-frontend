import axios from 'axios'

const USER_API_BASE_URL = 'http://localhost:9000/user'

class UserService {
    //GET
    findAllUsers() {
        let URL = USER_API_BASE_URL
        return axios.get(URL)
    }

    findUser(id) {
        let URL = USER_API_BASE_URL + '/' + id
        return axios.get(URL)
    }

    findAllRoles(){
        let URL = USER_API_BASE_URL + '/roles'
        return axios.get(URL)
    }

    //POST
    createUser(user){
        let URL = USER_API_BASE_URL
        return axios.post(URL, user)
    }

    //PUT
    editUser(id, user) {
        let URL = USER_API_BASE_URL + '/' + id
        return axios.put(URL, user)
    }

    //DELETE
    deleteUser(id){
        let URL = USER_API_BASE_URL + '/' + id
        return axios.delete(URL)
    }

    deleteAllUsers() {
        let URL = USER_API_BASE_URL
        return axios.delete(URL)
    }
}

export default new UserService()
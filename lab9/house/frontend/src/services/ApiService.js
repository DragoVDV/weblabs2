import axios from "axios"

class ApiService {
        getById(id) {
            return axios.get(`http://127.0.0.1:8000/api/${id}/`)

        }
}


export default new ApiService()
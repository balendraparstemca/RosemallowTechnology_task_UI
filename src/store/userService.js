import axios from "axios";

const API_URL = 'http://localhost:5000/api/users/'

class UserService {
  createAccount(obj) {
    return axios
      .post(API_URL,obj)
      .then((response) => {
        return response.data;
      });
  }

}
export default new UserService();
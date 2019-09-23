import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-365e4.firebaseio.com/"
});

export default instance;

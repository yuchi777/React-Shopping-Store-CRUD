//使用axios
import axios from 'axios';


const axiosSwitch = (baseURL)=>{

    //創建實例
    const instance = axios.create({
        baseURL: baseURL || 'http://localhost:3003/',
        timeout: 1000
      });

    return instance;
}


export { axiosSwitch };
export default axiosSwitch();
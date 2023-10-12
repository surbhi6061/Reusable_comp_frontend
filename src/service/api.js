import axios from 'axios';

class AxiosService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://reusablecomponent-backend-b9b2.onrender.com"
        });
    }


    getHeaders = () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token') || ''
            }
        };
        return config;
    }

    get(endPoint) {
        return this.axiosInstance.get(endPoint, this.getHeaders()).then(
            (res) => {
                return res.data
            }
        ).catch((err) => {
            throw new Error(err);
        });
    }

    post(endPoint, object) {
        return this.axiosInstance.post(endPoint, object, this.getHeaders()).then(
            (res) => {
                return res.data;
            },
        ).catch((err) => {
            throw new Error(err);
        });
    }

    update(endPoint, object) {
        return this.axiosInstance.put(endPoint, object).then(
            (res) => {
                return res.data;
            }
        ).catch((err) => {
            throw new Error(err);
        });
    }

    delete(endPoint) {
        return this.axiosInstance.post(endPoint).then(
            (res) => {
                return res.data;
            }
        ).catch((err) => {
            throw new Error(err);
        });
    }
}

export default new AxiosService()
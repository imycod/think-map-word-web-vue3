// import config from "@/configs/index.js"

// export default function request(url) {
//     return new Promise((resolve, reject) => {
//         console.log('config.baseUrl + url----',config.baseUrl + url);
//         fetch(config.baseUrl + url)
//             .then(res => res)
//             .then(res => {
//                 resolve(res)
//             })
//     })
// }
import axios from 'axios'


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {

            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error)

        return Promise.reject(error)
    }
)
export default service

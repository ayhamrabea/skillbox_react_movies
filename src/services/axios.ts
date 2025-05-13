import axios from "axios";


axios.defaults.withCredentials = true;
// إعداد axios مع قاعدة URL
// const instance = axios.create({
//     baseURL: 'https://cinemaguide.skillbox.cc'
// })

// // إضافة التوكن إلى كل طلب يتم إرساله
// instance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token')
//     if(token){
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config
// })

// export default instance;
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
    //요청 보내기 전 실행되는 함수
    function (config) {
        console.log('인터셉트 성공');
        return config;
    },

    function (error) {
        console.log('인터셉트 오류');
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        console.log('인터셉트 응답 성공');
        return response;
    },
    function (error) {
        console.log('인터셉트 응답 오류');
        return Promise.reject(error);
    }
);

export default instance;

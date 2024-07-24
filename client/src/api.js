// import axios from 'axios'

// const api = axios.create({
//     baseUrl: "http:/localhost:3001/api"
// })

// export const registerUser = async (username, password) => {
//     try {
//         const response = await axios.post(`${api}/register`, { username, password })
//         return response.data
//     } catch (error) {
//         throw error.response.data;
//     }
// }
// export const loginUser = async (username, passowrd) => {
//     try {
//         const response = await axios.post(`${api}/login`, { username, passowrd })
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }
import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:3001/api"
});

export const registerUser = async (username, password) => {
    try {
        const response = await api.post('/register', { username, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getQuizzes = async () => {
    try {
        const response = await api.get('/quizzes');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

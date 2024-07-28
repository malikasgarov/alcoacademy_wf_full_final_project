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
export const getUsersLength = async () => {
    try {
        const response = await api.get('/userslength');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getQuizzesLength = async () => {
    try {
        const response = await api.get('/quizzeslength');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getResults = async () => {
    try {
        const response = await api.get('/getresults');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const postResults = async (result) => {
    try {
        const response = await api.post('/postresults', {result});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getMath = async () => {
    try {
        const response = await api.get('/math');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getProgramming = async () => {
    try {
        const response = await api.get('/programming');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getHistory = async () => {
    try {
        const response = await api.get('/history');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};



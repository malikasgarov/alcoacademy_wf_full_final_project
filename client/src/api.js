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
    baseURL: "http://192.168.100.31:3001/api"
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
        return 
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
export const getResults = async () => {
    try {
        const response = await api.get('/getresults');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const postResults = async (result, username, subject, date) => {
    try {
        const response = await api.post('/postresults', { result, username, subject, date });
        return response.data;
    } catch (error) {
        console.error("Error posting results:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error;
    }
};
export const deleteUser = async (username) => {
    try {
        const response = await api.delete(`/delete-account/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting account", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error;
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
export const getEnglish = async () => {
    try {
        const response = await api.get('/english');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

//------------------ M E S S A G E S --------------------\\
export const getMessages = async () => {
    try {
        const response = await api.get('/messages');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const contactMess = async (username, email, contactmessage)=>{
    try{
        const response = await api.post('/contact', {username, email, contactmessage});
        return response.data;
    }catch(error){
            throw error.response.data;
    }
}



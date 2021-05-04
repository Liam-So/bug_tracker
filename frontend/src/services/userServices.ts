import axios from 'axios';
import { API_URL } from '../interfaces/constants';

const USER_URL = `${API_URL}/users`;

export const getUserList = async () => {
    const res = await axios.get(`${USER_URL}`);

    return res.data;
} 
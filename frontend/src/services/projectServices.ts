import axios from 'axios';
import { API_URL } from '../interfaces/constants';
import Project from "../interfaces/Project"

const PROJECT_URL = `${API_URL}/projects`;

// Gets project where user is assigned to
export const getProjectList = async (userID: string) => {
    const res = await axios.get(`${PROJECT_URL}/forUser/${userID}`);
    return res.data;
}

// Send project to DB
export const sendProject = async (project: Project) => {
    return await axios.post(`${PROJECT_URL}`, project);
} 
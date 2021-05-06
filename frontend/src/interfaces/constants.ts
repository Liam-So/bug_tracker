export const API_URL = "http://localhost:8001";

// WE ALWAYS ASSUME THAT THESE ARE IN THIS ORDER
export const status_codes = [
    { value: 'pending', label: 'Pending 🤷' },
    { value: 'in_progress', label: 'In Progress 🧑‍⚕️' },
    { value: 'completed', label: 'Done ✅' }
];

export const getDefaultStatusCode = (status: string) => {
    if (status === 'pending') {
        return 0;
    } else if (status === 'in_progress') {
        return 1;
    } else {
        return 2;
    }

}
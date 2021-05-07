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


export const ticketTypeArray = [
    { value: 'new_feature', label: 'New Feature ✔️' },
    { value: 'bug', label: 'Bug 🐛' },
];

export const getDefaultTicketType = (type: string) => {
    if (type === 'new_feature') {
        return 0;
    } else {
        return 1;
    }
}

export const ticketSeverityArray = [
    { value: 'critical', label: 'Critical 🚑' },
    { value: 'high', label: 'High 🙀' },
    { value: 'md', label: 'Medium 😅' },
    { value: 'low', label: 'Low ☕' }
];

export const getDefaultTicketSeverity = (type: string) => {
    if (type === 'critical') {
        return 0;
    } else if (type === 'high') {
        return 1;
    } else if (type === 'md') {
        return 2;
    } else {
        return 3;
    }
}

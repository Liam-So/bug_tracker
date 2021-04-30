export const ticketTypeArray = [
    { value: 'new_feature', label: 'New Feature ✔️' },
    { value: 'bug', label: 'Bug 🐛' },
];

export const ticketSeverityArray = [
    { value: 'critical', label: 'Critical 🚑' },
    { value: 'high', label: 'High 🙀' },
    { value: 'md', label: 'Medium 😅' },
    { value: 'low', label: 'Low ☕' }
];

export interface User {
    value: string;
    label: string;
    user: string;
}
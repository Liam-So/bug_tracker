export default interface Ticket {
    description: string;
    id: string;
    title: string;
    type: string;
    user: string | undefined;
    severity: string;
    project: string;
    comments: string[];
    value: string;
    label: string;
}
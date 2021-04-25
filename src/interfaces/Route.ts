export default interface Route {
    path: string;
    component: any;
    exact: boolean;
    name: string;
    protected: boolean;
}
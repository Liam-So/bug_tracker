import Route from "../interfaces/Route";
import Change from "../pages/auth/Change";
import Forgot from "../pages/auth/Forgot";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPasswordPage from "../pages/auth/Reset";
import Deleted from "../pages/Deleted";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Ticket from "../pages/Ticket";

const routes: Route[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/register',
        exact: true,
        component: Register,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/forgot',
        exact: true,
        component: Forgot,
        name: 'Forgot Page',
        protected: false
    },
    {
        path: '/change',
        exact: true,
        component: Change,
        name: 'Change Page',
        protected: true
    },
    {
        path: '/reset',
        exact: true,
        component: ResetPasswordPage,
        name: 'Reset Password Page',
        protected: false
    },
    {
        path: '/projects/',
        exact: true,
        component: Projects,
        name: 'Projects Page',
        protected: true
    },
    {
        path: '/projects/:id',
        exact: true,
        component: Projects,
        name: 'Projects Page',
        protected: true
    },
    {
        path: '/tickets/',
        exact: true,
        component: Ticket,
        name: 'Tickets Page',
        protected: true
    },
    {
        path: '/tickets/:id',
        exact: true,
        component: Ticket,
        name: 'Tickets Page',
        protected: true
    },
    {
        path: '/deleted',
        exact: true,
        component: Deleted,
        name: 'Successful Delete Page',
        protected: true
    },
];

export default routes
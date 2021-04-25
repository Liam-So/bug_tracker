import React from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from '../config/firebase';

const AuthRoute = ({ children } : { children:any }) => {

    if (!auth.currentUser) {
        console.log('No user detected, redirecting');
        return <Redirect to="/login" />;
    }

    return (
        <div>{children}</div>
    )
}

export default AuthRoute

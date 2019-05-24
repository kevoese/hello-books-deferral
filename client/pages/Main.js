import React from 'react';
import Home from '@pages/Home';
import Books from '@pages/Books';
import Register from '@pages/Register/index';
import SignIn from '@pages/SignIn/index';
import Dashboard from '@pages/Dashboard/index';
import { BrowserRouter, Route } from 'react-router-dom';
import context from '@context/authContext';

const { AuthProvider } = context;

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <AuthProvider>
                    <Route exact path="/" component={Home} />
                    <Route path="/books" component={Books} />
                    <Route path="/signup" component={Register} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/dashboard" component={Dashboard} />
                </AuthProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

import React from 'react';
import Home from '@pages/Home';
import Books from '@pages/Books';
import Navbar from '@components/Navbar';
import Register from '@pages/Register/index';
import SignIn from '@pages/SignIn/index';
import { BrowserRouter, Route } from 'react-router-dom';
import context from '@context/authContext';

const { AuthProvider } = context;

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Route exact path="/" component={Home} />
                    <Route path="/books" component={Books} />
                    <Route path="/signup" component={Register} />
                    <Route path="/signin" component={SignIn} />
                </AuthProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

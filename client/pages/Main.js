import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import About from './Home/About';
import index from './Home/index';
import Navbar from './Home/Navbar';
import SignUp from './Home/SignUp';
import { AuthProvider } from '../context/authContext';

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Route exact path="/" component={index} />
                    <Route path="/about" component={About} />
                    <Route path="/register" component={SignUp} />
                </AuthProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

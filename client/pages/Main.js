import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import About from '@home/About';
import index from '@home/index';
import Navbar from '@home/Navbar';
import ForgotPassword from '@home/ForgotPassword';

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={index} />
                <Route path="/about" component={About} />
                <Route path="/forgot" component={ForgotPassword} />
            </BrowserRouter>
        </React.Fragment>
    );
}
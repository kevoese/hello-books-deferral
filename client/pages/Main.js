import React from 'react';
import About from '@pages/About';
import index from '@pages/index';
import Navbar from '@components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={index} />
                <Route path="/about" component={About} />
                <Route path="/forgot" component={ForgotPassword} />
                <Route path="/reset" component={ResetPassword} />
            </BrowserRouter>
        </React.Fragment>
    );
}
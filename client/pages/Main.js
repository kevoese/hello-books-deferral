import React from 'react';
import Home from '@pages/Home/index';
import Navbar from '@components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import ForgotPassword from '@home/ForgotPassword';
import ResetPassword from '@home/ResetPassword';

export default function Main() {
    return (
        <React.Fragment>
            <div className="md:pl-3 lg:pl-3 xl:pl-3 md:pr-3 lg:pr-3 xl:pr-3">
                <BrowserRouter>
                    <Navbar />
                    <Route exact path="/" component={Home} />
                    <Route path="/forgot" component={ForgotPassword} />
                    <Route path="/reset" component={ResetPassword} />
                </BrowserRouter>
            </div>
        </React.Fragment>
    );
}
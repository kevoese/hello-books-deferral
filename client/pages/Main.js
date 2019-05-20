import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route, Link } from 'react-router-dom';
import About from '@home/About';
import index from '@home/index';
import Navbar from '@home/Navbar';
import ForgotPassword from '@home/ForgotPassword';
import ResetPassword from '@home/ResetPassword';
=======
import About from '@pages/About';
import index from '@pages/index';
import Navbar from '@components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
>>>>>>> #166056907 homepage first sections (#44)

export default function Main() {
    return (
        <React.Fragment>
<<<<<<< HEAD
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={index} />
                <Route path="/about" component={About} />
                <Route path="/forgot" component={ForgotPassword} />
                <Route path="/reset" component={ResetPassword} />
            </BrowserRouter>
=======
            <div className="md:pl-3 lg:pl-3 xl:pl-3 md:pr-3 lg:pr-3 xl:pr-3">
                <BrowserRouter>
                    <Navbar />
                    <Route exact path="/" component={index} />
                    <Route path="/about" component={About} />
                </BrowserRouter>
            </div>
>>>>>>> #166056907 homepage first sections (#44)
        </React.Fragment>
    );
}

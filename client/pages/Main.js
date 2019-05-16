import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import About from './Home/About';
import index from './Home/index';
import Navbar from './Home/Navbar';

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={index} />
                <Route path="/about" component={About} />
            </BrowserRouter>
        </React.Fragment>
    );
}

import React from 'react';
import Home from '@pages/Home';
import Navbar from '@components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';

export default function Main() {
    return (
        <React.Fragment>
            <div className="md:pl-3 lg:pl-3 xl:pl-3 md:pr-3 lg:pr-3 xl:pr-3">
                <BrowserRouter>
                    <Navbar />
                    <Route exact path="/" component={Home} />
                </BrowserRouter>
            </div>
        </React.Fragment>
    );
}

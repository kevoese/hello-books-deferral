import React from 'react';
import Home from '@pages/Home';
import Books from '@pages/Books';
import Navbar from '@components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/books" component={Books} />
            </BrowserRouter>
        </React.Fragment>
    );
}

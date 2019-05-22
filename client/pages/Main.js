import React from 'react';
import Home from '@pages/Home';
import Books from '@pages/Books';
import Navbar from '@components/Navbar';
import Register from '@pages/Register/index';
import { BrowserRouter, Route } from 'react-router-dom';
import context from '@context/authContext';

const { AuthProvider } = context;

export default function Main() {
    return (
        <React.Fragment>
            <div className="md:pl-3 lg:pl-3 xl:pl-3 md:pr-3 lg:pr-3 xl:pr-3">
                <BrowserRouter>
                    <AuthProvider>
                        <Navbar />
                        <Route exact path="/" component={Home} />
                        <Route path="/books" component={Books} />
                        <Route path="/signup" component={Register} />
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </React.Fragment>
    );
}

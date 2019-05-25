import React from 'react';
import Home from '@pages/Home';
import Books from '@pages/Books';
import BookDetails from '@pages/BookDetails';
import Navbar from '@components/Navbar';
import Register from '@pages/Register';
import SignIn from '@pages/SignIn';
import Dashboard from '@pages/Dashboard';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import context from '@context/authContext';

const { AuthProvider } = context;


const App = ({ history }) => {
    return (
        <AuthProvider>
            {(['/', '/about'].includes(history.location.pathname)  || history.location.pathname.match(/books/)) && <Navbar />}
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={Books} />
            <Route path="/signup" component={Register} />
            <Route path="/books/:bookId" component={BookDetails} />
        </AuthProvider>
    )
}

const AppWithRouter = withRouter(App)

export default function Main() {
    return (
        <React.Fragment>
            <div className="md:pl-3 lg:pl-3 xl:pl-3 md:pr-3 lg:pr-3 xl:pr-3">
                <BrowserRouter>
                    <AppWithRouter />
                </BrowserRouter>
            </div>
        </React.Fragment>
    );
}

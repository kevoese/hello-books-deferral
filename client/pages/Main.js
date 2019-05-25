import React from 'react';
import Home from '@pages/Home';
import Books from '@pages/Books';
import BookDetails from '@pages/BookDetails';
import Navbar from '@components/Navbar';
import AuthNavbar from '@components/authNavbar';
import Register from '@pages/Register';
import SignIn from '@pages/SignIn';
import Dashboard from '@pages/Dashboard';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import context from '@context/authContext';
import ForgotPassword from '@pages/ForgotPassword';
import ResetPassword from '@pages/ResetPassword';
import AdminDashboard from '@pages/AdminDashboard';
import AdminBooksDashboard from '@pages/AdminBooksDashboard';

const { AuthProvider } = context;

const App = ({ history }) => {
    return (
        <AuthProvider>
            {(([
                '/',
                '/about',
                '/signin',
                '/register',
                '/forgot-password'
            ].includes(history.location.pathname) ||
                history.location.pathname.match(/books/) ||
                history.location.pathname.match(/reset-password/) ||
                history.location.pathname.match(/signup/)) && <Navbar />) ||
                ([
                    '/dashboard',
                    '/admin-dashboard',
                    '/admin-libraryCatalogue'
                ] && <AuthNavbar />)}

            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={Books} />
            <Route path="/signup" component={Register} />
            <Route path="/signin" component={SignIn} />
            <Route path="/books/:bookId" component={BookDetails} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
            <Route
                path="/admin-libraryCatalogue"
                component={AdminBooksDashboard}
            />
        </AuthProvider>
    );
};

const AppWithRouter = withRouter(App);

export default function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <AppWithRouter />
            </BrowserRouter>
        </React.Fragment>
    );
}

import React, { useContext } from 'react';
import Home from '@pages/Home';
import Books from '@pages/Books';
import BookDetails from '@pages/BookDetails';
import Fines from '@pages/Fines';
import Navbar from '@components/Navbar';
import AuthNavbar from '@components/authNavbar';
import Register from '@pages/Register';
import SignIn from '@pages/SignIn';
import Profile from '@pages/Profile/index';
import Dashboard from '@pages/Dashboard';
import BorrowedBooks from '@pages/BorrowedBooks';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import context from '@context/authContext';
import ForgotPassword from '@pages/ForgotPassword';
import ResetPassword from '@pages/ResetPassword';
import Toaster from '@components/Toaster';
import toastContext from '@context/toastContext';
import AdminDashboard from '@pages/AdminDashboard';
import AdminBooksDashboard from '@pages/AdminBooksDashboard';
import { Redirect } from 'react-router-dom';

const { AuthProvider, AuthContext } = context;
const { ToastProvider } = toastContext;

const App = ({ history }) => {
    return (
        <ToastProvider>
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
                    (['/dashboard', '/admin-dashboard', '/admin/library'] && (
                        <AuthNavbar />
                    ))}

                {([
                    '/',
                    '/about',
                    '/signin',
                    '/signup',
                    '/forgot-password'
                ].includes(history.location.pathname) ||
                    history.location.pathname.match(/books/) ||
                    history.location.pathname.match(/reset-password/)) && (
                    <Navbar />
                )}
                <Toaster />
                <Route exact path="/" component={Home} />
                <Route exact path="/books" component={Books} />
                <OnlyGuestRoute path="/signup" component={Register} />
                <OnlyGuestRoute path="/signin" component={SignIn} />
                <OnlyGuestRoute
                    path="/reset-password/:token"
                    component={ResetPassword}
                />
                <OnlyGuestRoute
                    path="/forgot-password"
                    component={ForgotPassword}
                />
                <Route path="/books/:bookId" component={BookDetails} />
                <Route path="/admin-dashboard" component={AdminDashboard} />
                <Route path="/admin/library" component={AdminBooksDashboard} />
                <Route path="/borrowed" component={BorrowedBooks} />
                <Route path="/books/:bookId" component={BookDetails} />
                <Route path="/borrowed" component={BorrowedBooks} />
                <Route path="/profile" component={Profile} />
                <AuthRoute path="/dashboard" component={Dashboard} />
            </AuthProvider>
        </ToastProvider>
    );
};

const AuthRoute = ({ component: Component, props, ...rest }) => {
    const [auth, setAuth, isAuth] = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                isAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

const AdminRoute = ({ component: Component, props, ...rest }) => {
    const [auth, setAuth, isAuth, isAdmin] = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                isAdmin() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

const OnlyGuestRoute = ({ component: Component, props, ...rest }) => {
    const [auth, setAuth, isAuth] = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                !isAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

const AppWithRouter = withRouter(App);

export default function Main() {
    return (
        <React.Fragment>
            <div className="relative">
                <BrowserRouter>
                    <AppWithRouter />
                </BrowserRouter>
            </div>
        </React.Fragment>
    );
}

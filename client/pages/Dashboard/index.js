import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthNavbar from '@components/authNavbar/index';
import SideNavbar from '@components/sideNavbar/index';
import Footer from '@components/Footer/index';
import DashboardContent from '@pages/DashboardContent/index';
import BorrowedBooks from '@pages/BorrowedBooks/index';

const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="flex md:flex-row flex-wrap min-h-screen">
                <SideNavbar />
                <Switch>
                    <Route
                        exact
                        path="/dashboard"
                        component={DashboardContent}
                    />
                    <Route
                        path="/dashboard/borrowed"
                        component={BorrowedBooks}
                    />
                </Switch>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;

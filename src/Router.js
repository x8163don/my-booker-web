import {createBrowserRouter} from "react-router-dom";
import SingleColumn from "./components/layout/SingleColumn";
import SideMenu from "./components/layout/SideMenu";
import Home from "./pages/home/";
import Login from "./pages/login";
import Schedule from "./pages/schedule";
import Activity from "./pages/activity";
import Auth from "./pages/login/auth";
import ActivityNew from "./pages/activity/new";
import Email from "./pages/login/email";
import ActivityEdit from "./pages/activity/edit";
import Booking from "./pages/booking";
import Account from "./pages/account";
import Connect from "./pages/account/connect";
import Appointment from "./pages/appointment";
import Cancel from "./pages/appointment/cancel";
import {checkAuthTokenLoader} from "./utils/auth";
import NotFound from "./pages/system/NotFound";
import SingleWithFooter from "./components/layout/SingleWithFooter";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <SingleColumn/>,
        children: [
            {path: '', element: <Home/>}
        ]
    },
    {
        path: '/login',
        element: <SingleWithFooter/>,
        children: [
            {path: '', element: <Login/>},
            {path: 'email', element: <Email/>},
            {path: 'auth', element: <Auth/>}
        ]
    },
    {
        path: '/booking/:url_name/:booking_key',
        element: <SingleWithFooter/>,
        children: [
            {path: '', element: <Booking/>}
        ]
    },
    {
        path: '/appointment',
        element: <SingleColumn/>,
        children: [
            {path: 'cancel', element: <Cancel/>},
        ]
    },
    {
        path: '/appointment',
        loader: checkAuthTokenLoader,
        element: <SideMenu/>,
        children: [
            {path: '', element: <Appointment/>},
        ]
    },
    {
        path: '/activity',
        loader: checkAuthTokenLoader,
        element: <SideMenu/>,
        children: [
            {path: '', element: <Activity/>},
            {path: 'new', element: <ActivityNew/>},
        ]
    },
    {
        path: '/activity/:id/edit',
        loader: checkAuthTokenLoader,
        element: <SingleColumn/>,
        children: [
            {path: '', element: <ActivityEdit/>},
        ]
    },
    {
        path: '/schedule',
        loader: checkAuthTokenLoader,
        element: <SideMenu/>,
        children: [
            {path: '', element: <Schedule/>}
        ]
    },
    {
        path: '/account',
        loader: checkAuthTokenLoader,
        element: <SideMenu/>,
        children: [
            {path: '', element: <Account/>},
            {path: 'connect', element: <Connect/>}
        ]
    },

    {
        path: '*',
        element: <SingleColumn/>,
        children: [
            {path: '*', element: <NotFound/>}
        ]
    }

])

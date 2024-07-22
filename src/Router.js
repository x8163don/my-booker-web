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
        element: <SingleColumn/>,
        children: [
            {path: '', element: <Login/>},
            {path: 'email', element: <Email/>},
            {path: 'auth', element: <Auth/>}
        ]
    },
    {
        path: '/activity',
        element: <SideMenu/>,
        children: [
            {path: '', element: <Activity/>},
            {path: 'new', element: <ActivityNew/>},
        ]
    }, {
        path: '/activity/:id/edit',
        element: <SingleColumn/>,
        children: [
            {path: '', element: <ActivityEdit/>},
        ]
    },
    {
        path: '/schedule',
        element: <SideMenu/>,
        children: [
            {path: '', element: <Schedule/>}
        ]
    },
    {
        path: '/account',
        element: <SideMenu/>,
        children: [
            {path: '', element: <Account/>},
            {path: 'connect', element: <Connect/>}
        ]
    },
    {
        path: '/booking/:url_name/:booking_key',
        element: <Booking/>,
    }
])

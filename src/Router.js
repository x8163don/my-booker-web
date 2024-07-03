import {createBrowserRouter} from "react-router-dom";
import SingleColumn from "./components/layout/SingleColumn";
import SingleMenu from "./components/layout/SideMenu";
import Home from "./pages/home/";
import Login from "./pages/login";
import Schedule from "./pages/schedule";
import Activity from "./pages/activity";
import Auth from "./pages/login/auth";

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
            {path: 'auth', element: <Auth/>}
        ]
    },
    {
        path: '/schedule',
        element: <SingleMenu/>,
        children: [
            {path: '', element: <Schedule/>}
        ]
    },
    {
        path: '/activity',
        element: <SingleMenu/>,
        children: [
            {path: '', element: <Activity/>}
        ]
    }
])

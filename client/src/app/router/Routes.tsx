import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/activities/home/HomePage";
import ActivityDashboard from "../../features/activities/dashborad/ActivityDashboard";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetailPage /> },
            { path: 'createActivity', element: <ActivityForm key='create'/> },
            { path: 'manage/:id', element: <ActivityForm /> },
        ]
    }
])
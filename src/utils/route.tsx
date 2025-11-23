import App from "@/App";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminLayout from "@/layout/AdminLayout";
import UserLayout from "@/layout/UserLayout";
import HomaPage from "@/pages/HomePage";
import  Login  from "@/pages/Login";
import SignUpPage from "@/pages/SignUp";
import AllFiles from "@/pages/user/AllFiles";
import AllFolder from "@/pages/user/AllFolder";
import DailyQuiz from "@/pages/user/DailyQuiz";
import Dashboard from "@/pages/user/dashboard";
import FileOpen from "@/pages/user/FileOpen";
import FriendsPage from "@/pages/user/FriendsPage";
import ToDoList from "@/pages/user/ToDoList";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path : "/home",
        element: <HomaPage/>
    },
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                path: "dashboard",
                element : <Dashboard />
            },
            {
                path: ":user_id/files"  ,
                element : <AllFiles />
            },
            {
                path: ":user_id/folder",
                element : <AllFolder />
            },
            {
                path: "folders/:folder_id"  ,
                element : <AllFiles />
            },
            {
                path: "/file/:id",
                element : <FileOpen />    
            },
            {
                path: ":user_id/todo",
                element : <ToDoList />
            },
            {
                path: ":user_id/friends",
                element : <FriendsPage/>
            },
            {
                path : "/daily-quiz",
                element : <DailyQuiz/>
            }

        ]
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "dashboard",
                element : <Dashboard />
            },
            {
                path: ":user_id/files"  ,
                element : <AllFiles />
            },
            {
                path: ":user_id/folder",
                element : <AllFiles />
            },
            {
                path: ":user_id/file/:id",
                element : <FileOpen />    
            },
            {
                path: ":user_id/todo",
                element : <ToDoList />
            },
            {
                path: ":user_id/friends",
                element : <FriendsPage/>
            }

        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    }
]);

export default router;
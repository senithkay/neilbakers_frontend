import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import AllProducts from "./pages/AllProducts/AllProducts";
import AddProducts from "./pages/AddProducts/AddProducts";
import DailyStockUpdate from "./pages/DailyStockUpdate/DailyStockUpdate";
import SignIn from "./pages/Signin/SignIn";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Users from "./pages/Users/Users";
import AddUser from "./pages/AddUser/AddUser";
import DailyStockReport from "./pages/DailyStockReport/DailyStockReport";
import WeeklyStockReport from "./pages/WeekltStockReport/WeeklyStockReport";
import MonthlystockReport from "./pages/MothlyStockReport/MonthlyStockReport";
import ViewProducts from "./pages/ViewProduct/ViewProduct";
import { history } from "./utils/common.ts";
import { useNavigate, useLocation } from "react-router-dom";
import EnterOTP from "./pages/ResetPassword/EnterOTP.tsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.tsx";
import Locations from "./pages/Locations/Locations.tsx";
import AddLocation from "./pages/AddLocation/AddLocation.tsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.tsx";
import ViewUser from "./pages/ViewUser/ViewUser.tsx";
import { message } from "antd";

function App() {
    const [messageApi, contextHolder] = message.useMessage();
    history.messageApi = messageApi;
    const Layout = () => {
        history.navigate = useNavigate();
        history.location = useLocation();

        return (
            <div className="main">
                {contextHolder}
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    <Navbar />
                    <div className="outlet">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        );
    };

    const Layout2 = () => {
        history.navigate = useNavigate();
        history.location = useLocation();

        return (
            <div className="main">
                {contextHolder}
                <Outlet />
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/:id",
                    element: <Dashboard />,
                },
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "/products",
                    element: <AllProducts />,
                },
                {
                    path: "/add-products",
                    element: <AddProducts />,
                },
                {
                    path: "/add-products/:id",
                    element: <ViewProducts />,
                },
                {
                    path: "/daily-stock-update",
                    element: <DailyStockUpdate />,
                },
                {
                    path: "/daily-stock-update/:id",
                    element: <DailyStockUpdate />,
                },
                {
                    path: "daily-stock-report",
                    element: <DailyStockReport />,
                },
                {
                    path: "daily-stock-report/:id",
                    element: <DailyStockReport />,
                },
                {
                    path: "weekly-stock-report",
                    element: <WeeklyStockReport />,
                },
                {
                    path: "weekly-stock-report/:id",
                    element: <WeeklyStockReport />,
                },
                {
                    path: "monthly-stock-report",
                    element: <MonthlystockReport />,
                },
                {
                    path: "monthly-stock-report/:id",
                    element: <MonthlystockReport />,
                },
                {
                    path: "/users",
                    element: <Users />,
                },
                {
                    path: "/add-user",
                    element: <AddUser />,
                },
                {
                    path: "/edit-user/:id",
                    element: <ViewUser />,
                },
                {
                    path: "/locations",
                    element: <Locations />,
                },
                {
                    path: "/add-location",
                    element: <AddLocation />,
                },
                {
                    path: "/change-password",
                    element: <ChangePassword />,
                },
            ],
        },
        {
            path: "/auth",
            element: <Layout2 />,
            children: [
                {
                    path: "/signin",
                    element: <SignIn />,
                },
                {
                    path: "/forgot-password",
                    element: <ForgotPassword />,
                },
                {
                    path: "/reset-password-otp",
                    element: <EnterOTP />,
                },
                {
                    path: "/reset-password/:id",
                    element: <ResetPassword />,
                },
            ],
        },
        // {
        //     path: "/signin",
        //     element: <SignIn />,
        // },
        // {
        //     path: "/forgot-password",
        //     element: <ForgotPassword />,
        // },
        // {
        //     path: "/reset-password-otp",
        //     element: <EnterOTP />,
        // },
        // {
        //     path: "/reset-password/:id",
        //     element: <ResetPassword />,
        // },
    ]);

    return <RouterProvider router={router} />;
}

export default App;

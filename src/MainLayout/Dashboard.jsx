import { Outlet } from "react-router-dom";
import Sidebar from "../DashboardPages/Sidebar";

const Dashboard = () => {
    return (
        <div className="flex gap-2">
            <div>
                <Sidebar></Sidebar> 
            </div>

            <div className="overflow-x-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
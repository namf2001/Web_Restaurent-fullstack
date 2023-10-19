/** @format */
import { CircleChart, MostOrder, OrderReport, Stats } from "./components";
const Dashboard = () => {

    return (
        <div className="p-6 flex justify-between gap-6">
            <div className="flex flex-col gap-6 flex-1">
                <Stats />
                <OrderReport />
            </div>
            <div className="flex flex-col gap-6">
                <MostOrder />
                <CircleChart />
            </div>
        </div>
    );
};

export default Dashboard;

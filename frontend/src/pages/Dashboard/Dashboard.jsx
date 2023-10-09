/** @format */
import { MostOrder, OrderReport, Stats } from "./components";
const Dashboard = () => {
    return (
        <div className="p-6 flex justify-between gap-6">
            <div className="flex flex-col gap-6 flex-1">
                <Stats />
                <OrderReport />
            </div>
            <div className="flex flex-col gap-6">
                <MostOrder />
                <div className="bg- base/dark-bg-2-14 flex flex-col gap-4 w-full h-[343px] py-6 rounded-lg">
                    <div
                        id="Title"
                        className="bg- base/dark-bg-2-14 flex flex-row gap-6 items-center mx-6">
                        <div className="text-xl font-semibold text-white">
                            Most Type of Order
                        </div>
                        <div className="border-solid border-[#393c49] bg- base/dark-bg-2-14 self-start flex flex-row justify-center gap-2 w-24 shrink-0 h-12 items-center border rounded-lg">
                            <img
                                src="https://file.rendit.io/n/kJ52hEinqMXA9e8r7b5F.svg"
                                className="w-5 shrink-0"
                            />
                            <div
                                id="DineIn"
                                className="text-sm font-medium text-white">
                                Today
                            </div>
                        </div>
                    </div>
                    <img
                        src="https://file.rendit.io/n/nrKl1yZ1XQBuDr9x8LbY.svg"
                        id="Divider"
                        className="self-start mb-3"
                    />
                    <div className="flex flex-row gap-10 items-start ml-4 mr-6">
                        <div
                            id="Circle"
                            className="bg-[url(https://file.rendit.io/n/3xZB38GWdBVjAhKUp66v.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col justify-center w-3/5 items-end p-6">
                            <img
                                src="https://file.rendit.io/n/5y5283BhA4M1zp256nLB.svg"
                                id="Ellipse3"
                                className=""
                            />
                        </div>
                        <div className="self-end flex flex-col mb-px gap-3 items-start">
                            <div className="flex flex-row mb-1 gap-2 w-20 items-start">
                                <img
                                    src="https://file.rendit.io/n/SMlhwoqnizz2mMkxgcCl.svg"
                                    id="Ellipse"
                                    className="mt-px w-4 shrink-0"
                                />
                                <div className="flex flex-col gap-px w-16 shrink-0 items-start">
                                    <div className="text-sm font-medium text-white">
                                        Pending
                                    </div>
                                    <div className="text-xs leading-[16.8px] text-[#abbbc2]">
                                        200 orders
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-24 items-start">
                                <img
                                    src="https://file.rendit.io/n/vU7WymfuF884zbbKFJ5k.svg"
                                    id="Ellipse1"
                                    className="mt-px w-4 shrink-0"
                                />
                                <div className="flex flex-col gap-px w-20 shrink-0 items-start">
                                    <div className="text-sm font-medium text-white">
                                        Preparing
                                    </div>
                                    <div className="text-xs leading-[16.8px] text-[#abbbc2]">
                                        122 customers
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex flex-col w-24 items-start pt-2 pb-8">
                                <div
                                    id="Info"
                                    className="w-24 h-12 bg- base/dark-bg-2-14 absolute top-0 left-px flex flex-col gap-px items-start pl-4 py-1">
                                    <div className="text-sm font-medium text-white ml-2">
                                        Delivered
                                    </div>
                                    <div className="text-xs leading-[16.8px] text-[#abbbc2] ml-2">
                                        264 dishes
                                    </div>
                                </div>
                                <img
                                    src="https://file.rendit.io/n/U1CiQy92qONeX0sgKl3g.svg"
                                    id="Ellipse2"
                                    className="relative w-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

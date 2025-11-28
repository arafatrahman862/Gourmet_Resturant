import React from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure("/admin-stats");
            return res.data;
        },
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ["chart-data"],
        queryFn: async () => {
            const res = await axiosSecure("/order-stats");
            return res.data;
        },
    });

    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4F81", "#A78BFA"];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}
        C${x + width / 3},${y + height}
        ${x + width / 2},${y + height / 3}
        ${x + width / 2},${y}
        C${x + width / 2},${y + height / 3}
        ${x + (2 * width) / 3},${y + height}
        ${x + width},${y + height} Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                fontSize="14"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full px-6 md:px-10">

            {/* WELCOME HEADER */}
            <div className="flex items-center gap-4 mb-10">
                <img
                    src={
                        user?.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    className="w-16 h-16 rounded-full border-2 border-white shadow-lg object-cover"
                />

                <div>
                    <h2 className="text-3xl font-bold text-white">
                        Welcome, {user?.displayName}
                    </h2>
                    <p className="text-gray-400">Admin Dashboard Overview</p>
                </div>
            </div>

            {/* STATS SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* STAT CARD */}
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 hover:scale-[1.03] transition">
                    <h3 className="text-gray-300">Revenue</h3>
                    <p className="text-4xl font-bold text-green-400">${stats.revenue}</p>
                    <p className="text-sm text-gray-500 mt-2">This Month</p>
                </div>

                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 hover:scale-[1.03] transition">
                    <h3 className="text-gray-300">New Users</h3>
                    <p className="text-4xl font-bold text-blue-400">{stats.users}</p>
                    <p className="text-sm text-gray-500 mt-2">Growing steadily</p>
                </div>

                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 hover:scale-[1.03] transition">
                    <h3 className="text-gray-300">Menu Items</h3>
                    <p className="text-4xl font-bold text-yellow-300">{stats.products}</p>
                    <p className="text-sm text-gray-500 mt-2">Total active items</p>
                </div>

                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 hover:scale-[1.03] transition">
                    <h3 className="text-gray-300">Orders</h3>
                    <p className="text-4xl font-bold text-pink-400">{stats.orders}</p>
                    <p className="text-sm text-gray-500 mt-2">Completed orders</p>
                </div>

            </div>

            {/* CHART SECTION */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* BAR CHART */}
                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-2xl">
                    <h3 className="text-xl font-semibold text-white mb-4">Order Statistics</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                            <XAxis dataKey="category" stroke="#ddd" />
                            <YAxis stroke="#ddd" />

                            {chartData.length <= 1 ? (
                                // Use normal bar if only 1 data point
                                <Bar
                                    dataKey="total"
                                    fill="#3b82f6"
                                    barSize={80}
                                    radius={[10, 10, 0, 0]}
                                    label={{ position: "top", fill: "#fff" }}
                                />
                            ) : (
                                // Triangle bar for multiple categories
                                <Bar
                                    dataKey="total"
                                    shape={<TriangleBar />}
                                    label={{ position: "top", fill: "#fff" }}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colors[index % colors.length]}
                                        />
                                    ))}
                                </Bar>
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* PIE CHART */}
                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-2xl">
                    <h3 className="text-xl font-semibold text-white mb-4">Category Share</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Legend />

                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={chartData.length > 1}
                                label={chartData.length > 1 ? renderCustomizedLabel : false}
                                outerRadius={chartData.length > 1 ? 100 : 80}
                                innerRadius={chartData.length > 1 ? 40 : 0}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                        name={entry.category}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
};

export default AdminHome;

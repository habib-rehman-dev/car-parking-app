// ✅ Production-grade dashboard component
import React from "react";
import { FaCar, FaCheck, FaDollarSign, FaChartLine } from "react-icons/fa";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import StatsCard from "../../components/common/StatsCard";
import useGetStats from "../../hooks/dashboard/useGetStats";
import useGetRevenue from "../../hooks/dashboard/useGetRevenue";
import useGetParked from "../../hooks/dashboard/useGeTParked";

const Dashboard = () => {

  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useGetStats();
  const {
    data: revenueData,
    isLoading: revenueLoading,
    error: revenueError,
  } = useGetRevenue();
  const {
    data: parkedData,
    isLoading: parkedLoading,
    error: parkedError,
  } = useGetParked();

  // ✅ Show loading states
  if (statsLoading || revenueLoading || parkedLoading) {
    return <LoadingSpinner />;
  }

  // ✅ Handle errors gracefully
  if (statsError || revenueError || parkedError) {
    return <ErrorMessage error={statsError || revenueError || parkedError} />;
  }

  // ✅ Safe destructuring with fallbacks
  const currentlyParked = statsData?.stats?.currentlyparked ?? 0;
  const vehicleTypes = statsData?.stats?.accopyBYType ?? { bike: 0, car: 0 };
  const todayCheckins = statsData?.stats?.todayCheckins ?? [];
  const d = statsData?.stats
  console.log(d)

  const todayCheckouts = statsData?.stats?.todayCheckouts ?? [];

  const todayRevenue = revenueData?.revenue?.todayRevenue ?? 0;
  const weekRevenue = revenueData?.revenue?.lastWeekRevenue ?? 0;
  const monthRevenue = revenueData?.revenue?.lastMonthRevenue ?? 0;
  const allTimeRevenue = revenueData?.revenue?.allTimeRevenue ?? 0;

  // ✅ Compute derived data
  const totalVehicles = statsData?.stats?.totalVheicles ?? 0;
  
 

  return (
    <div className="px-4 py-6 space-y-6 pb-10  ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Today's parking overview</p>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">Last updated:</span>
          <span className="ml-2 text-sm font-medium text-gray-700">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Currently Parked"
          value={currentlyParked}
          icon={FaCar}
          color="blue"
        />
        <StatsCard
          title="Today's Revenue"
          value={`$${todayRevenue}`}
          icon={FaDollarSign}
          color="green"
        />
        <StatsCard
          title="Total Vehicles"
          value={totalVehicles}
          icon={FaChartLine}
          color="purple"
        />
        <StatsCard
          title="Today CheckOuts"
          value={todayCheckouts.length}
          icon={FaCheck}
          color="orange"
        />
      </div>

      {/* Vehicle Type Breakdown */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Vehicle Distribution
        </h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Bikes</span>
              <span className="text-sm font-medium text-gray-900">
                {vehicleTypes.bike}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(vehicleTypes.bike / totalVehicles) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Cars</span>
              <span className="text-sm font-medium text-gray-900">
                {vehicleTypes.car}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${(vehicleTypes.car / totalVehicles) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid lg:grid-cols-4  gap-2 sm:grid-cols-3 ">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-2xl font-bold text-gray-900">${todayRevenue}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Week</p>
          <p className="text-2xl font-bold text-gray-900">$ {weekRevenue}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-gray-900">${monthRevenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">All Time</p>
          <p className="text-2xl font-bold text-gray-900">${allTimeRevenue}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow  border-black border overflow-y-scroll   p-3">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Today's Activity
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          <h2 className="w-full p-1 text-center">
            Today CheckIns {todayCheckins.length}
          </h2>
          {parkedData.map((checkin) => (
            <div
              key={checkin._id}
              className="px-4 py-3 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Vehicle  {checkin.vehicleId.slice(-8)}
                </p>
                <p className="text-xs text-gray-500">
                  Entry: {new Date(checkin.entryTime).toLocaleTimeString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  checkin.status === "exited"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {checkin.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

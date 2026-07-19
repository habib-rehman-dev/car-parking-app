// features/dashboard/pages/Overview.jsx
import { useStats } from "../hooks/useStats";
import { useRevenue } from "../hooks/useRevenue";
import { useAllParked } from "../hooks/useAllParked";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PaidIcon from "@mui/icons-material/Paid";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventNoteIcon from "@mui/icons-material/EventNote";

// ── Reusable stat card ─────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent = "text-blue-300" }) => (
  <div
    className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20
               rounded-2xl p-5 hover:bg-white/15 transition-all"
  >
    <div className={`p-3 rounded-xl bg-white/10 ${accent}`}>{icon}</div>
    <div>
      <p className="text-white/60 text-xs uppercase tracking-wide">{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-3">
    {children}
  </h2>
);

const Overview = () => {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorObj,
    refetch: refetchStats,
  } = useStats();

  const {
    data: revenue,
    isLoading: revenueLoading,
    isError: revenueError,
    error: revenueErrorObj,
    refetch: refetchRevenue,
  } = useRevenue();

  const {
    data: allParked,
    isLoading: parkedLoading,
    isError: parkedError,
    error: parkedErrorObj,
    refetch: refetchParked,
  } = useAllParked();

  if (statsLoading || revenueLoading || parkedLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ── Occupancy & vehicle stats ─────────────────────────── */}
      <section>
        <SectionTitle>Occupancy</SectionTitle>
        {statsError ? (
          <ErrorState error={statsErrorObj} onRetry={refetchStats} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Currently Parked"
              value={stats.currentlyparked}
              icon={<LocalParkingIcon />}
              accent="text-emerald-300"
            />
            <StatCard
              label="Total Vehicles"
              value={stats.totalvehicles}
              icon={<DirectionsCarIcon />}
              accent="text-blue-300"
            />
            <StatCard
              label="Cars"
              value={stats?.accopyBYType?.car || 0}
              icon={<DirectionsCarIcon />}
              accent="text-indigo-300"
            />
            <StatCard
              label="Bikes"
              value={stats?.accopyBYType?.bike || 0}
              icon={<TwoWheelerIcon />}
              accent="text-amber-300"
            />
          </div>
        )}
      </section>

      {/* ── Revenue breakdown ──────────────────────────────────── */}
      <section>
        <SectionTitle>Revenue</SectionTitle>
        {revenueError ? (
          <ErrorState error={revenueErrorObj} onRetry={refetchRevenue} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Today"
              value={`$${revenue.todayRevenue}`}
              icon={<PaidIcon />}
              accent="text-green-300"
            />
            <StatCard
              label="Last 7 Days"
              value={`$${revenue.lastWeekRevenue}`}
              icon={<CalendarTodayIcon />}
              accent="text-teal-300"
            />
            <StatCard
              label="Last 30 Days"
              value={`$${revenue.lastMonthRevenue}`}
              icon={<EventNoteIcon />}
              accent="text-cyan-300"
            />
            <StatCard
              label="All Time"
              value={`$${revenue.allTimeRevenue}`}
              icon={<TrendingUpIcon />}
              accent="text-lime-300"
            />
          </div>
        )}
      </section>

      {/* ── Currently parked vehicles ──────────────────────────── */}
      {/* ── Currently parked vehicles ──────────────────────────── */}
<section>
  <SectionTitle>Currently Parked</SectionTitle>
  {parkedError ? (
    <ErrorState error={parkedErrorObj} onRetry={refetchParked} />
  ) : !allParked || allParked.length === 0 ? (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/50 text-sm">
      No vehicles currently parked.
    </div>
  ) : (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-white/60 text-left border-b border-white/10">
            <th className="px-5 py-3 font-medium">Vehicle</th>
            <th className="px-5 py-3 font-medium">Entry Time</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {allParked.map((session) => {
            const vehicle = session.vehicleId; // now an object OR null — never a raw string

            return (
              <tr key={session._id} className="text-white/90 border-b border-white/5 last:border-0">
                <td className="px-5 py-3">
                  {vehicle?.licencePlate || (
                    <span className="text-white/40 italic text-xs">Vehicle data unavailable</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  {new Date(session.entryTime).toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium capitalize bg-emerald-500/20 text-emerald-300">
                    {session.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</section>
    </div>
  );
};

export default Overview;

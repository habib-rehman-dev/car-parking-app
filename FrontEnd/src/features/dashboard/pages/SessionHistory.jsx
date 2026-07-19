import { useState } from "react";
import { useHistory } from "../hooks/useHistory";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import PersonIcon from "@mui/icons-material/Person";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap
      ${
        status === "exited"
          ? "bg-gray-500/20 text-gray-300"
          : "bg-emerald-500/20 text-emerald-300"
      }`}
  >
    {status}
  </span>
);

const VehicleTypeIcon = ({ type }) => {
  if (type === "car") return <DirectionsCarIcon fontSize="small" className="text-blue-300" />;
  if (type === "bike") return <TwoWheelerIcon fontSize="small" className="text-amber-300" />;
  return <DirectionsCarIcon fontSize="small" className="text-white/40" />;
};

const formatDuration = (entry, exit) => {
  if (!exit) return "—";
  const mins = Math.round((new Date(exit) - new Date(entry)) / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
};

const SessionHistory = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useHistory({ page, limit: 10 });

  if (isLoading) return <LoadingState message="Loading history..." />;
  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  const sessions = data?.docs || [];

  if (sessions.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-white/50 text-sm">
        No session history yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white text-lg font-semibold">Session History</h2>

      {/* ── MOBILE: stacked cards ─────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {sessions.map((session) => {
          const vehicle = session.vehicleId;
          return (
            <div
              key={session._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <VehicleTypeIcon type={vehicle?.type} />
                  <div>
                    <p className="text-white font-medium">
                      {vehicle?.licencePlate || <span className="text-white/40 italic">Unavailable</span>}
                    </p>
                    <p className="text-white/40 text-xs capitalize">{vehicle?.type}</p>
                  </div>
                </div>
                <StatusBadge status={session.status} />
              </div>

              {vehicle?.driverName && (
                <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2">
                  <PersonIcon sx={{ fontSize: 14 }} className="text-white/40" />
                  {vehicle.driverName} · {vehicle.phone}
                </div>
              )}

              <div className="grid grid-cols-2 gap-y-1 text-white/50 text-xs mb-3">
                <span>In: {new Date(session.entryTime).toLocaleString()}</span>
                <span>Out: {session.exitTime ? new Date(session.exitTime).toLocaleString() : "—"}</span>
                <span>Duration: {formatDuration(session.entryTime, session.exitTime)}</span>
              </div>

              <p className="text-white font-semibold text-right">
                {session.fee !== null ? `$${session.fee}` : "—"}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP: table ─────────────────────────────────────── */}
      <div className="hidden sm:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[750px]">
          <thead>
            <tr className="text-white/60 text-left border-b border-white/10">
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Driver</th>
              <th className="px-5 py-3 font-medium">Entry Time</th>
              <th className="px-5 py-3 font-medium">Exit Time</th>
              <th className="px-5 py-3 font-medium">Duration</th>
              <th className="px-5 py-3 font-medium">Fee</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const vehicle = session.vehicleId;
              return (
                <tr key={session._id} className="text-white/90 border-b border-white/5 last:border-0">
                  <td className="px-5 py-3">
                    {vehicle?.licencePlate ? (
                      <div className="flex items-center gap-2">
                        <VehicleTypeIcon type={vehicle.type} />
                        <div>
                          <p className="font-medium">{vehicle.licencePlate}</p>
                          <p className="text-white/40 text-xs capitalize">{vehicle.type}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-white/40 italic text-xs">Unavailable</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {vehicle?.driverName ? (
                      <div>
                        <p>{vehicle.driverName}</p>
                        <p className="text-white/40 text-xs">{vehicle.phone}</p>
                      </div>
                    ) : (
                      <span className="text-white/40 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    {new Date(session.entryTime).toLocaleString()}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    {session.exitTime ? new Date(session.exitTime).toLocaleString() : "—"}
                  </td>
                  <td className="px-5 py-3">{formatDuration(session.entryTime, session.exitTime)}</td>
                  <td className="px-5 py-3 font-medium">
                    {session.fee !== null ? `$${session.fee}` : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={session.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Pagination — driven by backend's own flags, works on both layouts ── */}
      <div className="flex items-center justify-between">
        <p className="text-white/50 text-xs">
          Page {data.page} of {data.totalPages} · {data.totalDocs} total sessions
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={!data.hasPrevPage}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm
                       rounded-lg border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon sx={{ fontSize: 16 }} />
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data.hasNextPage}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm
                       rounded-lg border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRightIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;
import useGetAcitve from "../hooks/useGetAcitve";// typo fixed — see note below
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap
      ${
        status === "parked"
          ? "bg-emerald-500/20 text-emerald-300"
          : "bg-gray-500/20 text-gray-300"
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

const VehicleList = () => {
  const {
    data: allParked,
    isLoading: parkedLoading,
    isError: parkedError,
    error: parkedErrorObj,
    refetch: refetchParked,
  } = useGetAcitve();

  if (parkedLoading) {
    return <LoadingState message="Loading vehicles..." />;
  }

  if (parkedError) {
    return <ErrorState error={parkedErrorObj} onRetry={refetchParked} />;
  }

  if (!allParked || allParked.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-white/50 text-sm">
        No vehicles currently parked.
      </div>
    );
  }

  return (
    <div>
      {/* ── MOBILE: stacked cards (below sm) ─────────────────────── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {allParked.map((session) => {
          const vehicle = session.vehicleId; // may be null — handle below

          return (
            <div
              key={session._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                {vehicle ? (
                  <div className="flex items-center gap-2">
                    <VehicleTypeIcon type={vehicle.type} />
                    <div>
                      <p className="text-white font-medium">{vehicle.licencePlate}</p>
                      <p className="text-white/40 text-xs capitalize">{vehicle.type}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-white/40 italic text-xs">Vehicle data unavailable</span>
                )}
                <StatusBadge status={session.status} />
              </div>

              {vehicle?.driverName && (
                <div className="flex items-center gap-1.5 text-white/70 text-sm mb-1">
                  <PersonIcon sx={{ fontSize: 14 }} className="text-white/40" />
                  {vehicle.driverName} · {vehicle.phone}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                In: {new Date(session.entryTime).toLocaleString()}
                {session.exitTime && (
                  <> · Out: {new Date(session.exitTime).toLocaleString()}</>
                )}
              </div>

              <p className="text-white font-semibold">${session.fee}</p>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP: table (sm and up) ────────────────────────────── */}
      <div className="hidden sm:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[650px]">
          <thead>
            <tr className="text-white/60 text-left border-b border-white/10">
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Driver</th>
              <th className="px-5 py-3 font-medium">Entry Time</th>
              <th className="px-5 py-3 font-medium">Exit Time</th>
              <th className="px-5 py-3 font-medium">Fee</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {allParked.map((session) => {
              const vehicle = session.vehicleId;

              return (
                <tr key={session._id} className="text-white/90 border-b border-white/5 last:border-0">
                  <td className="px-5 py-3">
                    {vehicle ? (
                      <div className="flex items-center gap-2">
                        <VehicleTypeIcon type={vehicle.type} />
                        <div>
                          <p className="font-medium">{vehicle.licencePlate}</p>
                          <p className="text-white/40 text-xs capitalize">{vehicle.type}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-white/40 italic text-xs">Vehicle data unavailable</span>
                    )}
                  </td>

                  <td className="px-5 py-3">
                    {vehicle ? (
                      <div className="flex items-center gap-1.5">
                        <PersonIcon fontSize="small" className="text-white/40" />
                        <div>
                          <p>{vehicle.driverName}</p>
                          <p className="text-white/40 text-xs">{vehicle.phone}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-white/40 text-xs">—</span>
                    )}
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap">
                    {new Date(session.entryTime).toLocaleString()}
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap">
                    {session.exitTime ? (
                      new Date(session.exitTime).toLocaleString()
                    ) : (
                      <span className="text-white/40">—</span>
                    )}
                  </td>

                  <td className="px-5 py-3 font-medium">${session.fee}</td>

                  <td className="px-5 py-3">
                    <StatusBadge status={session.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleList;
import useGetActive from "../hooks/useGetAcitve"; // fix typo below
import LoadingState from "../components/LoadingState"
import ErrorState from "../components/ErrorState";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import PersonIcon from '@mui/icons-material/Person';

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
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
  } = useGetActive();

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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
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
            const vehicle = session.vehicleId; // may be null — handle below

            return (
              <tr key={session._id} className="text-white/90 border-b border-white/5 last:border-0">
                {/* Vehicle column — handles missing vehicle gracefully */}
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

                {/* Driver column */}
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

                <td className="px-5 py-3">
                  {new Date(session.entryTime).toLocaleString()}
                </td>

                <td className="px-5 py-3">
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
  );
};

export default VehicleList;
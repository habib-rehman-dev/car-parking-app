import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import SessionCard from "../../components/common/SessionCard";
import useHistory from "../../hooks/useHistory";
// import { useMemo } from "react";

const SessionHistory = () => {

  let {data, isLoading , error} =useHistory()
 

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }
  const completedSessions = data || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Session History</h2>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
          {completedSessions.length} completed
        </span>
      </div>
      {completedSessions.map((session) => (
        <SessionCard key={session._id} session={session} />
      ))}
     
    </div>
  );
};

export default SessionHistory;

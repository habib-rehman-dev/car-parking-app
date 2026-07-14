import React, { useEffect, useState } from "react";
import SessionCard from "../../components/common/SessionCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import { vheicleCheckOut } from "../../service/vheicle.service";
import { getSessions } from '../../service/getSessions.service'

getSessions()


const SessionList = () => {
  let [sessions, setSessions] = useState([]);
  let [isLoading, setIsloading] = useState(false);
  let [error, setError] = useState(null);

   

  useEffect(() => {
    let get = async () => {
      try {
        setIsloading(true);
        let sessions = await getSessions();
        console.log(sessions+'\\\\\\\\\\')
        setSessions(sessions);
      
        setIsloading(false);
      } catch (err) {
        setIsloading(false);

        setError(err?.message);
      }
    };
    get();
  }, []);
 

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!sessions || sessions.length === 0) {
    return (
      <EmptyState
        title="No parking sessions"
        description="Start a new parking session to begin tracking."
      />
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard 
          key={session._id}
          session={session}
          onEndSession={vheicleCheckOut}
        />
      ))}
    </div>
  );
};

export default SessionList;




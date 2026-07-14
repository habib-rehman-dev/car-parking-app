import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const SessionCard = ({ session, onEndSession, isLoading }) => {
  const formatDate = (dateString) => {
    return Date(dateString).toLocaleString();
  };
  let [checkOutInfo , setCheckOutInfo] = useState(null)
  const isActive = session.status === 'parked';
async function getHist(licencePlate){
  let data = await onEndSession(licencePlate)
  setCheckOutInfo(data)
}
if(checkOutInfo){
  return JSON.stringify(checkOutInfo)
}
  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex justify-between items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {session.vehicleId?.licencePlate}
            </h3>
            <span className={`px-4 py-1  text-xs font-medium rounded ${
              isActive ? 'bg-green-100  text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {session.status}
            </span>
            <div className='shadow-lg mx-10 max-80 rounded-lg p-1 px-4  flex gap-5 justify-between'>
             <div>
                {session.vehicleId.phone}
              </div>
              <div>
                {String(session.vehicleId.driverName).toUpperCase()}
                </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 mt-1">
            Type: {session.vehicleId.type} 
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Started: {formatDate(session.entryTime)}
          </p>
          {session.exitTime && (
            <p className="text-sm text-gray-500">
              Ended: {formatDate(session.exitTime)}
            </p>
          )}
        </div>
        
        {isActive && onEndSession && (
          <button
            onClick={() =>
              {console.log(session.vehicleId)
             
            getHist(session.vehicleId.licencePlate)}}
            disabled={isLoading}
            className="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            End Session
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;


// {
//     "_id": "6a6b9cd9006446f8a0816bdf",
//     "vehicleId": {
//         "_id": "6a6b9cd9006446f8a0816bdc",
//         "type": "car",
//         "licencePlate": "5674G",
//         "driverName": "habib",
//         "phone": 3209667499,
//         "createdAt": "2026-07-30T18:50:01.743Z",
//         "updatedAt": "2026-07-30T18:50:01.743Z",
//         "__v": 0
//     },
//     "entryTime": "2026-07-30T18:50:01.762Z",
//     "exitTime": null,
//     "fee": null,
//     "status": "parked",
//     "createdAt": "2026-07-30T18:50:01.765Z",
//     "updatedAt": "2026-07-30T18:50:01.765Z",
//     "__v": 0
// }
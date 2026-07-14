import { useState } from "react";
import { vheicleCheckin } from "../../service/vheicle.service";
import { FaSearch } from "react-icons/fa";
import ErrorMessage from "../../components/common/ErrorMessage";

import { serachByPlate } from "../../service/vheicle.service";

const SessionForm = () => {
  let initialsate = {
    type: "car",
    licencePlate: "5674G",
    driverName: "habib",
    phone: 3209667499,
  };
  let [serch, setSearch] = useState({
    value: "jhgkgh",
    data: {},
    error: false,
    message: "",
  });
  console.log(serch.error);
  const [formData, setFormData] = useState(initialsate);
  const [error, setError] = useState(null);

  const getcal = () => {
    if (serch.value == "") return;
    let get = async () => {
      try {
        let data = await serachByPlate(serch.value);
        console.log(data);
        setSearch((pre) => {
          return {
            ...pre,
            data,
            message: "Parked",
            error: false,
          };
        });
      } catch {
        setSearch((prev) => ({
          ...prev,
          error: true,
          message: "No vheicle found",
        }));
      }
    };
    get();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await vheicleCheckin(formData);
      setError(null);
      setFormData(initialsate);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className="rounded-2xl bg-gray-100 mb-3 shadow-2xl border-gray-300 border p-2">
        <div className="my-3 w-full  md:w-1/2">
          <label
            htmlFor="licencePlate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Find By LicencePlate
          </label>
          <div className="flex ">
            <input
              type="text"
              name="licencePlate"
              value={serch.value}
              onChange={(e) => {
                setSearch((pre) => {
                  return {
                    ...pre,
                    value: e.target.value.toUpperCase(),
                  };
                });
              }}
              required
              placeholder="e.g., 676H"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button onClick={getcal} className=" px-3 bg-gray-500 rounded-md">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="border border-gray-400 bg-white  shadow-xl w-full min-h-25 p-10 rounded">
          {serch.error ? (
            serch.message
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-center gap-2">
                    <span
                      className={`px-4 py-1  text-xs font-medium rounded ${
                        serch.data.message == "Parked"
                          ? "bg-green-100  text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {serch?.data.session?.status}
                    </span>
                    <div className="shadow-lg mx-10 max-80 rounded-lg p-1 px-4  flex gap-5 justify-between"></div>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Started: {serch?.data.session?.entryTime}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Start New Parking Session
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Vehicle Type
            </label>
            <select
              type="text"
              name="type"
              defaultValue={"car"}
              onChange={handleChange}
              required
              placeholder="Type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {["bike", "car"].map((item) => {
                return (
                  <option key={item} value={item} className="uppercase ">
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="licencePlate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              licencePlate
            </label>
            <input
              type="text"
              name="licencePlate"
              value={formData.licencePlate}
              onChange={handleChange}
              required
              placeholder="e.g., 676H"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="driverName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              DriverName
            </label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              required
              placeholder="e.g., Habib"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="number"
              // min={10}
              // max={14}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g., 676H"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          // disabled={isLoading}
          className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Session
        </button>
        {error ? <ErrorMessage message={error.message} /> : ""}
      </form>
    </>
  );
};

export default SessionForm;

import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import database from "../Database/firebaseConfig";
import RealtimeDataCard from "./RealtimeDataCard";
import { useNavigate } from "react-router-dom";
import { AiOutlineTeam, AiOutlineCheckCircle } from "react-icons/ai";
import { FaTemperatureHigh } from "react-icons/fa6";

const Dashboard = () => {
  const navigate = useNavigate();

  const [insideData, setInsideData] = useState({
    Temperature: "Loading...",
    Humidity: "Loading...",
    ACTemperature: "Loading...",
    Count: "Loading...",
  });

  const [outsideData, setOutsideData] = useState({
    Temperature: "Loading...",
    Humidity: "Loading...",
  });

  const [settings, setSettings] = useState({
    MaxCapacity: 0,
    MaxTemp: 0,
    MinTemp: 0,
  });

  const [inputValues, setInputValues] = useState({
    MaxCapacity: "",
    MaxTemp: "",
    MinTemp: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch data from Firebase
  useEffect(() => {
    const dataRef = ref(database, "Data");
    const settingsRef = ref(database, "Settings");

    const unsubscribeData = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        setInsideData({
          Temperature: `${firebaseData["Temperature-1"]}°C`,
          Humidity: `${firebaseData["Humidity-1"]}%`,
          ACTemperature: `${firebaseData.ACTemperature}°C`,
          Count: `${firebaseData.Count}`,
        });
        setOutsideData({
          Temperature: `${firebaseData["Temperature-2"]}°C`,
          Humidity: `${firebaseData["Humidity-2"]}%`,
        });
      }
    });

    const unsubscribeSettings = onValue(settingsRef, (snapshot) => {
      const firebaseSettings = snapshot.val();
      if (firebaseSettings) {
        setSettings(firebaseSettings);
        setInputValues({
          MaxCapacity: firebaseSettings.MaxCapacity || "",
          MaxTemp: firebaseSettings.MaxTemp || "",
          MinTemp: firebaseSettings.MinTemp || "",
        });
      }
    });

    // Cleanup listeners on unmount
    return () => {
      unsubscribeData();
      unsubscribeSettings();
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Update settings in Firebase
  const handleUpdateSettings = () => {
    const updatedSettings = {
      MaxCapacity: parseInt(inputValues.MaxCapacity) || 0,
      MaxTemp: parseInt(inputValues.MaxTemp) || 0,
      MinTemp: parseInt(inputValues.MinTemp) || 0,
    };

    update(ref(database, "Settings"), updatedSettings)
      .then(() => {
        setSuccessMessage("Settings updated successfully!");
        setErrorMessage("");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setErrorMessage("Failed to update settings. Please try again.");
        setSuccessMessage("");
        setTimeout(() => setErrorMessage(""), 3000);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <h2 className="text-5xl font-extrabold text-green-800 mb-12 text-center drop-shadow-lg animate-fadeIn">
        Real-Time Data Dashboard
      </h2>

      {successMessage && (
        <div className="bg-green-200 text-green-800 py-3 px-5 rounded-lg shadow-lg flex items-center justify-between mb-6">
          <AiOutlineCheckCircle size={24} />
          <span className="ml-4 text-lg font-medium">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-200 text-red-800 py-3 px-5 rounded-lg shadow-lg flex items-center justify-between mb-6">
          <AiOutlineCheckCircle size={24} />
          <span className="ml-4 text-lg font-medium">{errorMessage}</span>
        </div>
      )}

      <div className="space-y-16">
        {/* Inside Room Section */}
        <section className="animate-fadeIn">
          <h3 className="text-3xl font-bold text-green-700 mb-6 drop-shadow-md">
            Inside Room
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <RealtimeDataCard
              title="Temperature"
              value={insideData.Temperature}
            />
            <RealtimeDataCard title="Humidity" value={insideData.Humidity} />
            <RealtimeDataCard
              title="AC Temperature"
              value={insideData.ACTemperature}
            />
            <RealtimeDataCard title="Person Count" value={insideData.Count} />
          </div>
        </section>

        {/* Outside Room Section */}
        <section className="animate-fadeIn">
          <h3 className="text-3xl font-bold text-green-700 mb-6 drop-shadow-md">
            Outside Room
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <RealtimeDataCard
              title="Temperature"
              value={outsideData.Temperature}
            />
            <RealtimeDataCard title="Humidity" value={outsideData.Humidity} />
          </div>
        </section>

        {/* Settings Section */}
        <section className="animate-fadeIn">
          <h3 className="text-3xl font-bold text-green-700 mb-6 drop-shadow-md">
            Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Max Capacity Input */}
            <div className="flex flex-col gap-2 bg-white p-3 rounded-lg shadow-md">
              <label className="text-lg font-medium text-green-800 flex items-center">
                <AiOutlineTeam size={20} className="mr-2" /> Max Capacity
              </label>
              <input
                type="text"
                name="MaxCapacity"
                value={inputValues.MaxCapacity}
                onChange={handleInputChange}
                className="px-3 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-blue-100"
                placeholder="Enter Max Capacity"
              />
            </div>

            {/* Max Temp Input */}
            <div className="flex flex-col gap-2 bg-white p-3 rounded-lg shadow-md">
              <label className="text-lg font-medium text-green-800 flex items-center">
                <FaTemperatureHigh size={20} className="mr-2" /> Max Temperature
              </label>
              <input
                type="text"
                name="MaxTemp"
                value={inputValues.MaxTemp}
                onChange={handleInputChange}
                className="px-3 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-blue-100"
                placeholder="Enter Max Temperature"
              />
            </div>

            {/* Min Temp Input */}
            <div className="flex flex-col gap-2 bg-white p-3 rounded-lg shadow-md">
              <label className="text-lg font-medium text-green-800 flex items-center">
                <FaTemperatureHigh size={20} className="mr-2" /> Min Temperature
              </label>
              <input
                type="text"
                name="MinTemp"
                value={inputValues.MinTemp}
                onChange={handleInputChange}
                className="px-3 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring focus:ring-green-300 bg-gradient-to-r from-green-100 to-blue-100"
                placeholder="Enter Min Temperature"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleUpdateSettings}
              className="px-10 py-3 text-lg font-medium bg-green-700 text-white rounded-full hover:bg-green-600 transition shadow-lg hover:shadow-2xl transform hover:scale-110"
            >
              Update Settings
            </button>
          </div>
        </section>
      </div>

      {/* Back Button */}
      <div className="flex justify-left mt-16">
        <button
          onClick={() => navigate("/")}
          className="px-10 py-3 text-lg font-medium bg-green-700 text-white rounded-full hover:bg-green-600 transition shadow-lg hover:shadow-2xl transform hover:scale-110"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

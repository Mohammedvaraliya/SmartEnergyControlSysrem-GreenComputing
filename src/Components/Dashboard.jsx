import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import database from "../Database/firebaseConfig";
import RealtimeDataCard from "./RealtimeDataCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    ACTemperature: "Loading...",
    AvgTemperature: "Loading...",
    Count: "Loading...",
    GSStatus: "Loading...",
    Humidity1: "Loading...",
    Humidity2: "Loading...",
    Temperature1: "Loading...",
    Temperature2: "Loading...",
  });

  // Fetch data from Firebase
  useEffect(() => {
    const dataRef = ref(database, "Data");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        setData({
          ACTemperature: `${firebaseData.ACTemperature}°C`,
          AvgTemperature: `${firebaseData.AvgTemperature}°C`,
          Count: `${firebaseData.Count}`,
          GSStatus: firebaseData.GSStatus === "0" ? "Inactive" : "Active",
          Humidity1: `${firebaseData["Humidity-1"]}%`,
          Humidity2: `${firebaseData["Humidity-2"]}%`,
          Temperature1: `${firebaseData["Temperature-1"]}°C`,
          Temperature2: `${firebaseData["Temperature-2"]}°C`,
        });
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <h2 className="text-5xl font-extrabold text-green-800 mb-8 text-center drop-shadow-lg animate-fadeIn">
        Real-Time Data Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
        <RealtimeDataCard title="AC Temperature" value={data.ACTemperature} />
        <RealtimeDataCard
          title="Average Temperature"
          value={data.AvgTemperature}
        />
        <RealtimeDataCard title="Person Count" value={data.Count} />
        <RealtimeDataCard title="System Status" value={data.GSStatus} />
        <RealtimeDataCard title="Humidity Sensor 1" value={data.Humidity1} />
        <RealtimeDataCard title="Humidity Sensor 2" value={data.Humidity2} />
        <RealtimeDataCard
          title="Temperature Sensor 1"
          value={data.Temperature1}
        />
        <RealtimeDataCard
          title="Temperature Sensor 2"
          value={data.Temperature2}
        />
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/")}
          className="px-10 py-4 text-lg font-medium bg-green-700 text-white rounded-full hover:bg-green-600 transition shadow-lg hover:shadow-2xl transform hover:scale-110"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

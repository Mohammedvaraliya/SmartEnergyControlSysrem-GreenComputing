import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import database from "../Database/firebaseConfig";
import RealtimeDataCard from "./RealtimeDataCard";
import { useNavigate } from "react-router-dom";

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
    AvgTemperature: "Loading...",
    GSStatus: "Loading...",
  });

  // Fetch data from Firebase
  useEffect(() => {
    const dataRef = ref(database, "Data");
    const unsubscribe = onValue(dataRef, (snapshot) => {
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
          AvgTemperature: `${firebaseData.AvgTemperature}°C`,
          GSStatus: firebaseData.GSStatus === "0" ? "Inactive" : "Active",
        });
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <h2 className="text-5xl font-extrabold text-green-800 mb-12 text-center drop-shadow-lg animate-fadeIn">
        Real-Time Data Dashboard
      </h2>

      <div className="space-y-16">
        {/* Inside Room Section */}
        <section className="animate-fadeIn">
          <h3 className="text-3xl font-bold text-green-700 mb-6 drop-shadow-md">
            Inside Room
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <RealtimeDataCard
              title="Temperature"
              value={outsideData.Temperature}
            />
            <RealtimeDataCard title="Humidity" value={outsideData.Humidity} />
            <RealtimeDataCard
              title="Average Temperature"
              value={outsideData.AvgTemperature}
            />
            <RealtimeDataCard
              title="System Status"
              value={outsideData.GSStatus}
            />
          </div>
        </section>
      </div>

      <div className="flex justify-center mt-16">
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

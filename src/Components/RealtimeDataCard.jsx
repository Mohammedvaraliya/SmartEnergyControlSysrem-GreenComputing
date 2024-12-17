import { FaLeaf } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { BsThermometerHalf } from "react-icons/bs";
import { TbAirConditioning } from "react-icons/tb";
import { VscVmActive, VscVmOutline } from "react-icons/vsc";

const RealtimeDataCard = ({ title, value }) => {
  const icons = {
    Humidity: <WiHumidity className="w-6 h-6 text-blue-500" />,
    Temperature: <BsThermometerHalf className="w-6 h-6 text-red-500" />,
    "AC Temperature": <TbAirConditioning className="w-6 h-6 text-teal-500" />,
    "Person Count": <AiOutlineUser className="w-6 h-6 text-purple-500" />,
    "System Status":
      value === "Active" ? (
        <VscVmActive className="w-6 h-6 text-green-500" />
      ) : (
        <VscVmOutline className="w-6 h-6 text-red-500" />
      ),
  };

  const baseTitle = Object.keys(icons).find(
    (key) => title.trim().toLowerCase() === key.trim().toLowerCase()
  );

  const MetricIcon = icons[baseTitle] || null;

  return (
    <div className="relative p-6 bg-gradient-to-r from-green-100 via-white to-blue-50 rounded-lg shadow-md border border-green-300 hover:shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
      {/* Constant Leaf icon for green tech */}
      <div className="absolute top-0 right-0 p-2 bg-green-500 text-white rounded-full shadow-lg transform translate-x-2 -translate-y-2">
        <FaLeaf className="w-5 h-5" />
      </div>

      {/* Metric-specific icon for each data */}
      <div className="flex items-center gap-3 mb-4 justify-center">
        {MetricIcon && (
          <div className="p-2 bg-gray-100 rounded-full shadow-md">
            {MetricIcon}
          </div>
        )}
        <h3 className="text-lg font-bold text-green-800 uppercase tracking-wide text-center">
          {title}
        </h3>
      </div>

      <div className="flex justify-center items-center">
        <p className="text-4xl font-extrabold text-green-700 text-center">
          {value}
        </p>
      </div>
    </div>
  );
};

export default RealtimeDataCard;

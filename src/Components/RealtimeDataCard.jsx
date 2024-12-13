const RealtimeDataCard = ({ title, value }) => (
  <div className="p-6 bg-white rounded-lg shadow-md border border-green-200 hover:shadow-lg hover:scale-105 transform transition-all duration-300">
    <h3 className="text-xl font-semibold text-green-700 mb-2 capitalize">
      {title.replace(/([A-Z])/g, " $1")}
    </h3>
    <p className="text-3xl font-bold text-green-600">{value}</p>
  </div>
);

export default RealtimeDataCard;

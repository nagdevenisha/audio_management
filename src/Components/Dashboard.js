import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

function Dashboard() {


const api="https://backend-urlk.onrender.com";
// const api="http://localhost:3001";

  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [station, setStation] = useState("");
  const[label,setLabel]=useState('');
  const[error,setError]=useState({cityErr:"",stationErr:""});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("City:", city, "Station:", station);
    // ✅ You can save it to DB or state here
    // setShowModal(false);
    setCity("");
    setStation("");
  };

const cities = [
    { name: "Delhi", stations: 8, clips: 245, status: "Active" },
    { name: "Karnal", stations: 6, clips: 189, status: "Active" },
    { name: "Trichy", stations: 10, clips: 321, status: "Active" },
    { name: "Jalgaon", stations: 4, clips: 156, status: "Active" },
  ];

  const stations = [
    { name: "Radio City", city: "Delhi", clips: 45, status: "Excellent" },
    { name: "Red fm", city: "Karnal", clips: 32, status: "Good" },
    { name: "Big Fm", city: "Trichy", clips: 58, status: "Excellent" },
    { name: "Radio Tadka", city: "Jalgaon", clips: 28, status: "Fair" },
  ];

  const statusColors = {
    Active: "bg-green-100 text-green-600",
    Excellent: "bg-green-100 text-green-600",
    Good: "bg-gray-200 text-gray-600",
    Fair: "bg-yellow-100 text-yellow-600",
  };

 const handleClick = (e) => {
   setLabel(e);
  setShowModal(true);
};

const handleSave=async()=>{
  
  try{
          if(label==="city")
          {
           const res=await axios.post(`${api}/app/setNewCity`,{city});
           console.log(res.data);
           if(res.data==="City Already Present")
           {
             setError({cityErr:"City Already Present"});
           }
           else if(res.data.msg==="City saved")
           {
              alert("City Saved");
           }
           alert(res.data.msg);
          }
          else
          {
            const res=await axios.post(`${api}/app/setNewStation`,{station,city})
            console.log(res.data);
            if(res.data.msg==="This station already exists for the city")
            {
               setError({stationErr:"This station already exists for the city"});
              //  alert("add city");
            }
          }
  }
  catch(err)
  {
          console.log(err);
  }
}

  return (
     <div className="min-h-screen bg-white px-6 py-8">
      {/* Header */}
       <button
      onClick={() => window.history.back()}
      className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition mb-4"
    >
      <ChevronLeft className="mr-1 w-5 h-5" />
      Back
    </button>
      <h1 className="text-2xl font-bold mb-6 text-purple-700">Audio Clipping Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Manage your audio clips and collaborate with your team
      </p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl">🎵</div>
          <div>
            <p className="text-sm text-gray-500">Clips Today</p>
            <h2 className="text-xl font-semibold">24</h2>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <div className="bg-pink-100 p-3 rounded-xl">⏱</div>
          <div>
            <p className="text-sm text-gray-500">Total Duration</p>
            <h2 className="text-xl font-semibold">4h 32m</h2>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">👥</div>
          <div>
            <p className="text-sm text-gray-500">Active Users</p>
            <h2 className="text-xl font-semibold">8</h2>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-xl">📊</div>
          <div>
            <p className="text-sm text-gray-500">This Week</p>
            <h2 className="text-xl font-semibold">156</h2>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Select Date</h3>
          <input
            type="date"
            className="w-full border rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Daily Stats */}
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">August 30, 2025 Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-purple-100 rounded-lg text-center">
              <h2 className="text-lg font-bold text-purple-700">12</h2>
              <p className="text-sm text-gray-600">Clips Uploaded</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <h2 className="text-lg font-bold text-green-700">8</h2>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg text-center">
              <h2 className="text-lg font-bold text-yellow-700">4</h2>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="p-4 bg-gray-200 rounded-lg text-center">
              <h2 className="text-lg font-bold text-gray-700">5</h2>
              <p className="text-sm text-gray-600">Cities Done</p>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg text-center">
              <h2 className="text-lg font-bold text-pink-700">3</h2>
              <p className="text-sm text-gray-600">FM Stations</p>
            </div>
          </div>
        </div>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* City Management */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">City Management</h2>
            {/* <button className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition" value="city"onClick={(e)=>handleClick(e.target.value)}>
              + Add City
            </button> */}
          </div>
          <div className="space-y-4">
            {cities.map((city, idx) => (
              <div key={idx} className="flex justify-between items-center border rounded-lg p-4">
                <div>
                  <h3 className="font-medium">{city.name}</h3>
                  <p className="text-sm text-gray-500">Stations: {city.stations}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Clips: {city.clips}</p>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[city.status]}`}>
                    {city.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radio Stations */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Radio Stations</h2>
            <button className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition" value="station" onClick={(e)=>handleClick(e.target.value)}>
              + Add Station
            </button>
          </div>
          <div className="space-y-4">
            {stations.map((station, idx) => (
              <div key={idx} className="flex justify-between items-center border rounded-lg p-4">
                <div>
                  <h3 className="font-medium">{station.name}</h3>
                  <p className="text-sm text-gray-500">City: {station.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Clips: {station.clips}</p>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[station.status]}`}>
                    {station.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
           <div className="p-6">

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-4 text-purple-700">
              Add {label} 
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* City */}
              <div>
                <label className="block text-gray-700">{label.toLocaleUpperCase()}</label>
                <input
                  type="text"
                  value={label==="city"?city:station}
                  onChange={(e) => {label==="city"?setCity(e.target.value):setStation(e.target.value)}}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                {label==="station" &&
                <div>
                 <label className="block text-gray-700">CITY</label>
                 <input
                  type="text"
                  value={city}
                  onChange={(e)=>setCity(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                </div>
                }
                {label==="station" && error.stationErr && <p className="text-red-500">{error.stationErr}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                onClick={handleSave}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Dashboard;

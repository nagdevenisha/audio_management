import  { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin,Users, Crown } from "lucide-react";
import axios from "axios";

function Teams() {
  const [selectedCity, setSelectedCity] = useState("");
  const[cities,setCities]=useState([]);
  const[stations,setStations]=useState([]);
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({
    teamName: "",
    teamLead: "",
    radioStation: "",
    city: "",
  });
  const teamTypes = ["Quality Team", "Labelling Team"];
  const members=["Nisha","Minal","Mrunal","Sakshi"];

  const handleCities=async()=>{
  try{
      const res=await axios.get('http://localhost:3001/app/city');
      if(res.status===200)
     {
       console.log(res.data);
       const city=res.data.map(item=>item.city);
       setCities(city);
       }
     }
    catch(err)
    {
     console.log(err);
    }
  }

  const handleTeams=async(city)=>{
  try{
    console.log(city);
      const res=await axios.get('http://localhost:3001/app/station',{
      params:{city}
     });
     if(res.status===200)
     {
        console.log(res.data);
        setStations(res.data);
     }
    }
   catch(err)
   {
      console.log(err);
   } 

  }
   const handleCreateTeam = async() => {
    if (!newTeam.teamName || !newTeam.teamLead || !newTeam.radioStation || !newTeam.city) {
      alert("Please fill all fields!");
      return;
    }
     try {
    const res = await axios.post("http://localhost:3001/app/saveteam", {
      teamName: newTeam.teamName,
      leadName: newTeam.teamLead,
      station: newTeam.radioStation,
      city: newTeam.city,
      members: newTeam.members, 
    });
    setTeams([...teams, res.data]);
    setNewTeam({ teamName: "", teamLead: "", radioStation: "", city: "", members: [] });
  } catch (err) {
    console.error("Error creating team:", err);
  }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition"
      >
        <ChevronLeft className="mr-1 w-5 h-5" />
        Back to Workstation
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-purple-700 mt-4">
        Team Collaboration
      </h1>
      <p className="text-gray-600 mt-2">
        Manage teams, assign clips, and track progress
      </p>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-md rounded-2xl p-6 mt-8 border border-gray-200"
      >
        <div className="flex items-center mb-4">
          <MapPin className="text-purple-600 w-6 h-6 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Select City</h2>
        </div>

        {/* Dropdown */}
        <label className="block text-gray-600 mb-2 font-medium">
          Choose City to View Teams
        </label>
        <select
          value={selectedCity} 
          // onChange={(e) => setSelectedCity(e.target.value)}
           onFocus={handleCities} 
            onChange={(e) => {
              const city = e.target.value;
              setSelectedCity(city);
              if (city) handleTeams(city); 
            }}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
        >
          <option value="">Select city...</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city} onSelect={()=>handleTeams(city)}>
              {city}
            </option>
          ))}
        </select>

        {/* Dynamic Content */}
        {selectedCity && (
          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-4">
            <h3 className="text-purple-700 font-semibold">
              Teams in {selectedCity}
            </h3>
            <p className="text-gray-600 mt-2">
              Display team members, assign clips, and track progress here.
            </p>
          </div>
        )}
      </motion.div>

      {selectedCity &&<motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-md rounded-2xl p-6 mt-8 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          + Create New Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[300px]">
          {/* Team Name */}
          <div>
            <label className="block text-gray-700 mb-1">Team Name</label>
            <select
              value={newTeam.teamName}
              onChange={(e) =>
                setNewTeam({ ...newTeam, teamName: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select team type...</option>
              {teamTypes.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Team Lead */}
          <div>
            <label className="block text-gray-700 mb-1">Team Lead</label>
            <input
              type="text"
              value={newTeam.teamLead}
              onChange={(e) =>
                setNewTeam({ ...newTeam, teamLead: e.target.value })
              }
              placeholder="Enter Team Lead"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Radio Station */}
          <div>
            <label className="block text-gray-700 mb-1">Radio Station</label>
            <select
              value={newTeam.radioStation}
              onChange={(e) =>
                setNewTeam({ ...newTeam, radioStation: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select station...</option>
              {stations.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 mb-1">City</label>
            <select
              value={newTeam.city}
              onChange={(e) =>
                setNewTeam({ ...newTeam, city: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select city...</option>
              {cities.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Members</label>
            <select
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Member</option>
              {members.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleCreateTeam}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          Create Team
        </button>
      </motion.div>}

      {/* Teams List
      {stations.map((station, idx) => {
        const stationTeams = teams.filter((t) => t.radioStation === station);
        if (stationTeams.length === 0) return null;

        return (
          <div key={idx} className="mt-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              {station}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stationTeams.map((team, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow p-6 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {team.teamName}
                      </h3>
                    </div>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {team.members.length} members
                    </span>
                  </div>

                  <div className="flex items-center mt-3">
                    <Crown className="text-yellow-500 mr-2" />
                    <p className="text-gray-700 font-medium">
                      {team.teamLead}{" "}
                      <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                        Team Lead
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-xl font-bold text-purple-700">
                        {team.pending}
                      </p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xl font-bold text-green-700">
                        {team.completed}
                      </p>
                      <p className="text-sm text-gray-600">Completed Today</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })} */}
    </div>
  );
};


export default Teams;

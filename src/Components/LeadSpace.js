import React from 'react';
import { Upload, Play, Edit2, ArrowLeft,Crown } from "lucide-react";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LeadSpace() {

const [team,setTeam]=useState(null);
const navigate = useNavigate();
const location=useLocation();

useEffect(()=>{
      setTeam(location.state.team);  
      console.log(location.state.team); 
},[location.state.team])


  const [tasks, setTasks] = useState([
    {
      id: 1,
      file: "mumbai_mirchi_morning_show_2024.mp3",
      station: "Radio Mirchi 98.3",
      duration: "03:45",
      assignedTo: "Priya Sharma",
      time: "2 hours ago",
      priority: "High",
    },
    {
      id: 2,
      file: "delhi_redfm_traffic_update.mp3",
      station: "Red FM 93.5",
      duration: "01:30",
      assignedTo: "Rohit Singh",
      time: "1 hour ago",
      priority: "Medium",
    },
  ]);
  return (
    <div>
     <div className="p-6 space-y-8">
      {/* Back to Teams Button */}
      <button
        onClick={() => navigate("/teams")}
        className="flex items-center gap-2 text-purple-700 font-medium hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Teams
      </button>

      {/* Header */}
     {team && <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-purple-700">
          🎧 {team.station}{" "}{team.teamName}{/*Radio City Quality Team*/}
        </h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div>
            <p className="text-500 font-semibold mb-1">Team Lead</p>
            <div className="flex items-center">
                <Crown className="text-yellow-500 w-5 h-5 mr-2" />
                <p className="text-700">{team.leadName}</p>
            </div>
            </div>
          <div>
            <p className="text-500 font-semibold">Total Members</p>
            <p className="font-semibold text-purple-700 text-xl">{team.members.length}</p>
          </div>
          <div>
            <p className=" font-semibold">Performance Today</p>
            <p>
              <span className="bg-green-400 text-xs px-2 py-1 rounded-full">
                       {team.completedtask }{" "}Completed
                      </span>{" "}
              |<span className="ml-2 bg-red-300 text-xs px-2 py-1 rounded-full">
                        {team.pendingtask }{" "}Pending
                      </span>
            </p>
          </div>
        </div>
      </div>}
      {/* Assign New Task */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">
          ➤ Assign New Task
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500">
            <option>Select station...</option>
            <option>Radio Mirchi</option>
            <option>Red FM</option>
          </select>
          <input
            type="text"
            placeholder="Assigned to.."
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          />
          <label className="flex items-center justify-center gap-2 border rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-50">
            <Upload className="w-5 h-5 text-purple-600" />
            <span>Upload Audio</span>
            <input type="file" className="hidden" />
          </label>
        </div>
        <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-700 transition">
          Assign Task
        </button>
      </div>

      {/* Pending Clip Assignments */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">
          ⏱ Pending Clip Assignments
        </h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <Play className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold">{task.file}</p>
                  <p className="text-sm text-gray-600">
                    Station: {task.station} • Duration: {task.duration}
                  </p>
                  <p className="text-xs text-gray-500">
                    Assigned to: {task.assignedTo} • {task.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg flex items-center gap-1">
                  Review
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-lg">
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default LeadSpace

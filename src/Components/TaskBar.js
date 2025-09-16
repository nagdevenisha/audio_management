import {useEffect, useState} from 'react';
import {ChevronLeft,Crown,Search} from "lucide-react";
import { Play, User, Clock ,Info,X,FileText,Download} from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskBar() {


   const api="https://backend-urlk.onrender.com";
  // const api="http://localhost:3001";
   const [searchTerm, setSearchTerm] = useState("");
   const[openModal,setopenModal]=useState(false);
   const[tasks,setTasks]=useState([]);
   const[segment,setSegment]=useState([]);
   const navigate=useNavigate();
   const location=useLocation();
   const[downloadurl,setDownloadUrl]=useState('');
  useEffect(()=>{
         if (location.state?.data) {
        setTasks(location.state.data);
        console.log(location.state.data);
  }

  },[location.state]);

  const filteredTasks = tasks.filter(task => {
  const search = searchTerm.toLowerCase();
  return (
    task.assignto?.toLowerCase().includes(search) ||
    task.instructions?.toLowerCase().includes(search) ||
    task.team?.teamName?.toLowerCase().includes(search)
  );
});

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const handleTasks=(task)=>{
    setopenModal(true);
    setSegment(task);
    console.log(task);
  }


  const handleDownload=async(file)=>{
       try{
            const res = await axios.get(`${api}/app/download?key=${encodeURIComponent(file)}`);
            console.log(res.data.url);
            const url=res.data.url;
           const link = document.createElement("a");
    link.href = url;
    link.download = decodeURIComponent(file.split("/").pop()); // filename
    document.body.appendChild(link);
    link.click();
    link.remove();
              }
       catch(err)
       {
         console.log(err);
       }
  }

  return (
  <div className="min-h-screen bg-white px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition mb-6"
      >
        <ChevronLeft className="mr-1 w-5 h-5" />
        Back to Teams
      </button>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-purple-700 mb-1">Member Tasks</h1>
      <p className="text-gray-600 mb-8">View and manage all assigned tasks</p>

      {/* Search Card */}
      <div className="bg-white rounded-2xl shadow-md border p-6">
        {/* Card Header */}
        <div className="mb-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <Search className="h-5 w-5 text-indigo-600" />
            Search Tasks
          </h2>
        </div>

        {/* Search Input */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by member name, task title, or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
            />
          </div>
        </div>

        {/* Task Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              All Tasks ({filteredTasks?.length || 0})
            </h2>
          </div>
        </div>
      </div>

       <div>
      {filteredTasks.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-500">
            No tasks found matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 mt-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
               onClick={()=>handleTasks(task)}
              // onClick={()=>setopenModal(true)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{task.team.teamName}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {task.instructions}
                      </p>
                    </div>
                    <button
                      className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700 transition"
                      onClick={() => {
                           navigate('/labelling',{state:{audio:task.audioTasks}});
                        // handleTaskClick(task);
                      }}
                    >
                      <Play className="h-4 w-4" />
                      Open Workspace
                    </button>
                  </div>

                  {/* Assigned user + duration + due date */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{task.assignto}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{task.audio.length}{" "} Files</span>
                    </div>
                   <span>
                        Date: {new Date(task.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority} priority
                    </span>
                    <span className="flex items-center px-2 py-1 rounded border text-xs font-medium text-gray-700">
                      <Crown className="text-yellow-500 w-4 h-4 mr-2"/>{task.team.leadName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    {openModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <Info className="text-blue-500" size={20} />
            <h2 className="text-lg font-semibold">Task / Segment Details</h2>
          </div>
          <button
            onClick={() => setopenModal(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-gray-500">
            Details for <strong>{segment.assignto}</strong>
          </p>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Overview</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p><strong>Status:</strong> {segment.status}</p>
              <p><strong>Instructions:</strong> {segment.instructions}</p>
              <p><strong>Created:</strong> {new Date(segment.createdAt).toLocaleString()}</p>
              <p><strong>Team:</strong> {segment.team?.teamName} ({segment.team?.station})</p>
              <p><strong>City:</strong> {segment.team?.city}</p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Audio Files</h3>
            <ul className="list-disc list-inside text-sm">
            {segment.audio?.map((file, i) => {
              const filename = encodeURIComponent(file);
              console.log(file) // decode URL
              return (
                <li key={i} className="flex items-center justify-between border rounded p-2 my-1">
                  <span>{file}</span>
                  <button
                      onClick={() => handleDownload(file)}
                      className="hover:text-gray-700 bg-red-500 p-1 rounded"
                    >
                      <Download />
                    </button>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>
    </div>
     }
    </div>
  );
}

export default TaskBar;

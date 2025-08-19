import {useState} from 'react';
import {ChevronLeft,Search} from "lucide-react";


function TaskBar() {

   const [searchTerm, setSearchTerm] = useState("");
    const allTasks= [
    {
      id: '1',
      title: 'Quality Check - Morning Show Segment',
      assignedTo: 'John Smith',
      teamName: 'Quality Team Alpha',
      teamId: 'qt-alpha',
      status: 'pending',
      priority: 'high',
      duration: '45:30',
      dueDate: '2024-01-20',
      description: 'Review morning show audio for quality standards'
    },
    {
      id: '2',
      title: 'Label Music Tracks - Rock Playlist',
      assignedTo: 'Sarah Johnson',
      teamName: 'Labelling Team Beta',
      teamId: 'lt-beta',
      status: 'in-progress',
      priority: 'medium',
      duration: '1:15:20',
      dueDate: '2024-01-21',
      description: 'Categorize and label rock music tracks'
    },
    {
      id: '3',
      title: 'Quality Review - Advertisement Spots',
      assignedTo: 'Mike Davis',
      teamName: 'Quality Team Alpha',
      teamId: 'qt-alpha',
      status: 'completed',
      priority: 'low',
      duration: '30:15',
      dueDate: '2024-01-19',
      description: 'Check advertisement audio quality and compliance'
    },
    {
      id: '4',
      title: 'Content Analysis - Talk Show',
      assignedTo: 'Emily Chen',
      teamName: 'Labelling Team Gamma',
      teamId: 'lt-gamma',
      status: 'needs-review',
      priority: 'high',
      duration: '2:10:45',
      dueDate: '2024-01-22',
      description: 'Analyze and categorize talk show content'
    },
    {
      id: '5',
      title: 'Audio Enhancement - News Segment',
      assignedTo: 'John Smith',
      teamName: 'Quality Team Alpha',
      teamId: 'qt-alpha',
      status: 'pending',
      priority: 'medium',
      duration: '25:40',
      dueDate: '2024-01-23',
      description: 'Enhance news segment audio quality'
    },
    {
      id: '6',
      title: 'Music Classification - Jazz Collection',
      assignedTo: 'Sarah Johnson',
      teamName: 'Labelling Team Beta',
      teamId: 'lt-beta',
      status: 'in-progress',
      priority: 'low',
      duration: '1:30:00',
      dueDate: '2024-01-24',
      description: 'Classify and organize jazz music collection'
    }
  ];

  const filteredTasks = allTasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
    </div>
  );
}

export default TaskBar;

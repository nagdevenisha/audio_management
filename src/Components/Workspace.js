import React,{useState} from 'react';
import { ChevronLeft, Calendar, Clock, MapPin ,Radio,Upload,Loader2} from "lucide-react";
import Timeline from './Timeline';
import SegmentList from './Segments';
import axios from 'axios';
import AudioWaveform from './WaveSurfer';



export default function Workspace() {
    const [file, setFile] = useState(null);
    const [count, setCount] = useState(0);
     const [recordings, setRecordings] = useState([]);
    const [loading, setLoading] = useState(false);
    const[audio,setAudio]=useState("");   
    const[loader,setLoader]=useState(false);       

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  

  const handleUploads = async (e) => {
    if (!file) return;

    setLoading(true);
    console.log(file)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "recording");

    try {
      const res = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(res.data) setLoading(false);
      console.log(res.data);
      setAudio(res.data);
      setRecordings((prev) => [...prev, res.data]); // add uploaded file info
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  const handleUpload = async () => {
    if (!file) return;
    setLoader(true);
    const formData = new FormData();
    formData.append("masterFile", file);
    formData.append("type", "master");

    const res=await axios.post("http://localhost:3001/api/master/upload",formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(res.data) setLoader(false);
    console.log(res.data);
    setCount((prev) => prev + 1);
  };
   
  const intervals = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      intervals.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  
  const handleMatching=async()=>{
            try{
                   const res=await axios.post("http://localhost:3001/audiomatching");
                   console.log(res.data);
               }
            catch(err)
            {
                 console.log(err);
                 
            }
  }

  return (
   <div className="min-h-screen bg-white px-6 py-8">
     <button
      onClick={() => window.history.back()}
      className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition mb-4"
    >
      <ChevronLeft className="mr-1 w-5 h-5" />
      Back to Teams
    </button>

    {/* Heading */}
   <div className="text-left mb-6">
  <h1 className="text-3xl font-bold text-purple-700 mb-1">
    Quality Review Workspace
  </h1>
  <p className="text-gray-600">
    Radio City Quality Team - Review auto-labeled segments from fingerprint matching system
  </p>
</div>
    <div className="bg-gradient-to-br from-purple-50 to-white px-6 py-8">
  {/* Transparent Wrapper */}
  <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
    
    {/* Back Button */}


    {/* Filters Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Select City */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center mb-4">
          <MapPin className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold">Select City</h2>
        </div>
        <label className="block text-sm text-gray-700 mb-2">
          Choose city
        </label>
        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Select city...</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
          <option value="pune">Pune</option>
        </select>
      </div>

      {/* Select Date */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold">Select Date</h2>
        </div>
        <label className="block text-sm text-gray-700 mb-2">
          Choose date to review
        </label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Select Radio Station */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold">Select Radio Station</h2>
        </div>
        <label className="block text-sm text-gray-700 mb-2">
          Choose station
        </label>
        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Select Radio Station</option>
          <option value="Radio city">Radio city</option>
          <option value="Red fm">Red fm</option>
          <option value="Radio mirchi">Radio mirchi</option>
          <option value="Radio Tadka">Radio Tadka</option>
        </select>
      </div>
    </div>

    {/* Upload Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Master Fingerprints */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Radio className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold">Master Fingerprints</h2>
        </div>
        <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-3"
      />
       {loader &&  <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
            <span className="ml-2 text-gray-600">Loading segment...</span>
          </div>}
        <button onClick={handleUpload} className="flex items-center justify-center w-full border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition">
          <Upload className="w-4 h-4 mr-2" /> Add Master Fingerprint
        </button>
        <p className="text-sm text-gray-500 mt-2">{count}{" "}fingerprints uploaded</p>
      </div>

      {/* Recordings */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Upload className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold">Recordings</h2>
        </div>
        <input
        type="file"
        id="recordingUpload"
        accept="audio/*"
        onChange={(e)=>setFile(e.target.files[0])}
         className="mb-3"
      />
      {loading &&  <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
            <span className="ml-2 text-gray-600">Loading segment...</span>
          </div>}
        <button onClick={handleUploads} className="flex items-center justify-center w-full border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition">
          <Upload className="w-4 h-4 mr-2" /> Add Recording
        </button>
        <p className="text-sm text-gray-500 mt-2">{recordings.length} recordings uploaded</p>
      </div>
    </div>
    <div className='flex justify-center'>
         <button className="px-8 py-2 bg-purple-500 text-white rounded mt-8 " >   {/*onClick={handleMatching} */}
    Audio Matching
  </button>
    </div>

</div>
</div>

    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Audio Review Details</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-purple-100 text-purple-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Time Slot</p>
            <p className="text-xl font-bold">08:00-09:00</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Station</p>
            <p className="text-xl font-bold">Radio XYZ, Mumbai</p>
          </div>
          <div className="bg-teal-100 text-teal-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Fingerprint Matches</p>
            <p className="text-xl font-bold">2</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Total Segments</p>
            <p className="text-xl font-bold">2</p>
          </div>
        </div>
      </div>

      {/* Automatic Labeling */}
     <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
  <h3 className="font-semibold mb-3">Automatic Labeling Results</h3>
  
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
      ✅ Fingerprint Matching
    </div>
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
      📍 Timeline Mapping
    </div>
    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
      📄 JSON Records
    </div>
  </div>
</div>
        
    <AudioWaveform audio={audio}/>
    <Timeline audio={audio}/>
    <SegmentList/>
    <div className="flex justify-end">
  <button className="px-8 py-2 bg-purple-500 text-white rounded mt-8">
    Submit Changes
  </button>
  </div>
      </div>
      </div>
  )
}
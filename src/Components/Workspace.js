import React,{useState} from 'react';
import { ChevronLeft, Calendar, Clock, MapPin ,Radio,Upload,Loader2} from "lucide-react";
import Timeline from './Timeline';
import SegmentList from './Segments';
import axios from 'axios';
import AudioWaveform from './WaveSurfer';



export default function Workspace() {
    const [file, setFile] = useState([]);
    const [count, setCount] = useState(0);
     const [recordings, setRecordings] = useState("");
    const [loading, setLoading] = useState(false);
    const[audio,setAudio]=useState("");   
    const[loader,setLoader]=useState({"loader1":false,"loader2":false});       
    const[station,setStation]=useState("");
    const[city,setCity]=useState("");
    const[date,setDate]=useState("");
    const[error,setError]=useState({recordError:"",fpError:"",labelError:""});
    const[load,setLoad]=useState(false);

 const api="https://backend-fj48.onrender.com";
  //  const api="http://localhost:3001";

  const handleFileChange = (e) => {
      setFile(Array.from(e.target.files));
  };
  

  const handleUploads = async (e) => {

    if(!city || !date || !station)
    {
       setError({labelError:"Please select date/city/station"});
       return;
    }
    setError({labelError:""});
     if (file.length===0) 
    {
      setError({recordError:"Please select files"});
      return;
    }
    setLoading(true);
    console.log(file)
    const formData = new FormData();
    file.forEach((fil) => {
    formData.append("files", fil); 
    formData.append("city",city);
    formData.append("date",date);
    formData.append("station",station);
  });
    formData.append("type", "recording");

    try {
      const res = await axios.post(`${api}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(res.data) setLoading(false);
      console.log(res.data);
      setAudio(res.data.mergedFile);
      setRecordings(res.data); // add uploaded file info
      setFile([]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  const handleUpload = async () => {
     if(!city || !date || !station)
    {
       setError({labelError:"Please select date/city/station"});
       return;
    }
    setError({labelError:""});
    if (file.length===0) 
    {
      setError({fpError:"Please select files"});
      return;
    }
    setError("");
    setLoader({loader1:true});
    const formData = new FormData();
    file.forEach((files) => {
     formData.append("masterFiles", files); // use same field name for array
   });
    formData.append("type", "master");

    const res=await axios.post("http://localhost:3001/api/master/upload",formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(res.data) setLoader({loader1:false}); setFile([]);
    console.log(res.data);
    setCount(res.data.files.length);
  };
   
  const intervals = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      intervals.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  
  const[data,setData]=useState([]);
  const handleMatching=async()=>{
               
            try{
                  //  const res=await axios.post("http://localhost:3001/audiomatching");
                  //  console.log(res.data);
                  const res=await axios.get("http://localhost:3001/app/getlabel",{
                    params:{
                      city:city,
                      station:station,
                      date:date
                    }
                  });
                  if(res.data)
                  {
                       console.log(res.data)
                        setData(res.data);
                        setLoad(true);
                  }
          
               }
            catch(err)
            {
                 console.log(err);
                 
            }
  }
  const handleclips=async()=>{
    try{
             setLoader({loader2:true});
            const res=await axios.post('http://localhost:3001/app/minuteclip',{audio:recordings.record.fileName});
            console.log(res.data);
            if(res.status)
            {
               setLoader({loader2:false});
            }
          }
    catch(err)
    {
       console.log(err)
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
        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"onChange={(e)=>setCity(e.target.value)}>
          <option value="">Select city...</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
          <option value="pune">Pune</option>
          <option value="karnal">Karnal</option>
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
          onChange={(e)=>setDate(e.target.value)}
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
        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" onChange={(e)=>setStation(e.target.value)}>
          <option value="">Select Radio Station</option>
          <option value="radio-city">Radio City</option>
          <option value="red-fm">Red Fm</option>
          <option value="radio-mirchi">Radio Mirchi</option>
          <option value="radio-tadka">Radio Tadka</option>
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
        {error.fpError && <p className='text-red-500'>*{error.fpError}</p>}
        <input
        type="file"
        multiple accept="audio/*"
        onChange={handleFileChange}
        className="mb-3"
      />
       {loader.loader1 &&  <div className="flex items-center justify-center py-10">
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
        {error.recordError && <p className='text-red-500'>*{error.recordError}</p>}
        <input
         type="file"
          webkitdirectory="true"
          directory=""
          multiple
          onChange={(e) => setFile(Array.from(e.target.files))}
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
        {recordings && <p className='font-semibold'>do you want to create 5 min clip? <span><button className='border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition bg-green-200' onClick={handleclips}>Yes</button></span><button className='ml-4 border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition bg-red-200'>No</button>{loader.loader2 && <Loader2 className="animate-spin text-blue-500 w-8 h-8" />}</p>}
      </div>
    </div>
    {error.labelError && <p className='text-red-500'>{error.labelError}</p>}
    <div className='flex justify-center'>
         <button className="px-8 py-2 bg-purple-500 text-white rounded mt-8 " onClick={handleMatching}>
    Audio Matching
  </button>
    </div>

</div>
</div>

    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {load &&
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Audio Review Details</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-purple-100 text-purple-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Date</p>
            <p className="text-xl font-bold">{date}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Station</p>
            <p className="text-xl font-bold">{station}, {city}</p>
          </div>
          <div className="bg-teal-100 text-teal-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Fingerprint Uploaded</p>
            <p className="text-xl font-bold">{count}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl text-center">
            <p className="text-sm font-medium">Total Segments</p>
            <p className="text-xl font-bold">2</p>
          </div>
        </div>
      </div>}

      {/* Automatic Labeling */}
     {load && <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
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
</div>}
        
      {recordings && load &&(
      <AudioWaveform
        audio={audio} 
        start={recordings.startTime} 
        // end={recordings.endTime} 
      />
    )}

   {recordings && load && (
  <>
    {console.log(recordings.startTime)}
    <Timeline audio={audio} starts={recordings.startTime} data={data} date={date} city={city} station={station} />
  </>
)}
    {/* <SegmentList/> */}
    <div className="flex justify-end">
  <button className="px-8 py-2 bg-purple-500 text-white rounded mt-8">
    Submit Changes
  </button>
  </div>
      </div>
      </div>
  )
}
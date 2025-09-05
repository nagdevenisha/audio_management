import { useState,useRef,useEffect } from "react";
import { Play,  Volume2,ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CreatableSelect from 'react-select/creatable';




export default function Labellingworkspace() {

  const [audioFile, setAudioFile] = useState(null);
  const navigate=useNavigate();
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const[role,setRole] =useState('');
  const[error,setError]=useState('');
    const [allPrograms, setAllPrograms] = useState([]);
    const[type,setType]=useState("ads");
      const [options, setOptions] = useState([]);
  const[meta,setMeta]=useState({
     city:'',
     date:'',
     channel:'',
     program:'',
     starttime:'',
     endtime:'',
     duration:'',
     contentType:''

  });
 
  const api="https://backend-urlk.onrender.com";
  // const api="http://localhost:3001";
const startOffset = 0;
  const handleSkip = (seconds) => {
  if (!wavesurferRef.current) return;

  const ws = wavesurferRef.current;
  const current = ws.getCurrentTime();
  const duration = ws.getDuration();

  // new time (bounded between 0 and duration)
  let newTime = current + seconds;
  if (newTime < 0) newTime = 0;
  if (newTime > duration) newTime = duration;

  ws.setTime(newTime);
  setCurrentTime(formatTime(newTime+startOffset));
};

  const intervals = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      intervals.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  const formatTime = (secs) => {
    if (isNaN(secs)) return "00:00:00";
    const h = Math.floor(secs / 3600).toString().padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

 const [currentTime, setCurrentTime] = useState(0);
 useEffect(() => {
  if (!containerRef.current || !audioFile) return;

  const ws = WaveSurfer.create({
    container: containerRef.current,
    waveColor: "#a78bfa",
    progressColor: "#7c3aed",
    cursorColor: "#1e293b",
    barWidth: 2,
    height: 150,
    backend: "MediaElement",
  });

  const fileUrl = URL.createObjectURL(audioFile);
  const fakePeaks = new Array(2000).fill(0).map(() => Math.random() * 2 - 1);
  ws.load(fileUrl, fakePeaks);

  ws.on("ready", () => {
    setIsReady(true);
    ws.setTime(0);
    setCurrentTime(formatTime(startOffset));
  });

  ws.on("audioprocess", (time) => {
    setCurrentTime(formatTime(time + startOffset));
  });

  ws.on("seek", (progress) => {
    const duration = ws.getDuration();
    setCurrentTime(formatTime(progress * duration + startOffset));
  });

  wavesurferRef.current = ws;

  return () => {
    ws.destroy();
    URL.revokeObjectURL(fileUrl);
  };
}, [audioFile]);
const submitMetadata=async()=>{
  try{ 
         console.log(meta);
           if(!meta.channel || !meta.contentType || !meta.duration || !meta.endtime || !meta.starttime || !meta.program || !meta.date || !meta.city) {
             setError('Enter All Fields');
             return;
           };
           setError("");
          // const res=await axios.post(`${api}/app/savemetadata`,{meta});
          const res=await axios.post(`${api}/app/savemetadata`, {
          metadata: meta, // {city, date, channel, program, ...}
        });
        console.log(res.data);
        if(res.data.success)
        {
            
             alert("Metadata saved!");
        }
       
  }
  catch(err)
  {
       console.log(err);
  }
}
useEffect(()=>{
    const token=localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setRole(decoded.role);
},[])
 
useEffect(() => {
  if (!meta.contentType) return;
  console.log(meta.contentType)
  if (meta.contentType === "Advertisement") setType("ads");
  else if (meta.contentType === "Song") setType("songs");
  else if (meta.contentType === "Program") setType("programs");
  else if (meta.contentType === "Jingle") setType("jingle");

  axios.get(`${api}/suggest?type=${type}`)
    .then(res => {
      // res.data should be an array from Redis
      console.log(res.data);
      setAllPrograms(res.data);
      setOptions(res.data.map(item => ({ value: item, label: item }))); // 🔑 populate options
    });
}, [meta.contentType, type]);


const handleChange = async (selected) => {
  if (!selected) return;

  const value = selected.value;
  setMeta(prev => ({ ...prev, program: value }));

  // Save into Redis if new
  await axios.post(`${api}/add?type=${type}&value=${value}`);

  // Also add immediately to options (for better UX)
  setOptions(prev => [...prev, { value, label: value }]);
};



  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-purple-700 font-medium hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Audio Labelling</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100">
            Team Collaboration
          </button>
          <button className="px-4 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100">
            Clip History
          </button>
          <button className="px-3 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100">
            ⚙️
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audio Selection */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Audio Selection</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Select City</label>
              <select
                className="w-full border rounded-lg p-2 mt-1"
                value={meta.city}
                onChange={(e) => setMeta(prev => ({ ...prev, city: e.target.value }))}
              >
                <option>Choose city...</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Karnal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2 mt-1"
                value={meta.date}
                onChange={(e) => setMeta(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Upload Audio File</label>
              <input
                type="file"
                className="w-full border rounded-lg p-2 mt-1"
                onChange={(e) => setAudioFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        {/* Audio Playback & Clipping */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
           {!audioFile ? (
                    <>
                    <h2 className="text-lg font-semibold mb-4">Audio Playback & Clipping</h2>
                    <div className="border rounded-lg p-6 text-center">
                        <Volume2 className="mx-auto mb-2" size={30} />
                        <p className="text-gray-500">Upload an audio file to see waveform</p>
                    </div>
                    </>
                ) : (
                    <div>
                          <div className="w-full mx-auto p-6">
                            <div
                                ref={containerRef}
                                className="w-full h-[150px] bg-gray-100 rounded-md"
                            />
                            </div>
                            </div>
                )}

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700"  onClick={() => wavesurferRef.current?.playPause()}>
              <Play size={28} />
            </button>
          </div>

          {/* Time Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-500 mb-4 flex justify-center">
              Current Position: {currentTime}
            </p>
              <div className="flex gap-2 mt-2">
                {[-10, -5, -1, +1, +2, +10].map((sec) => (
                  <button
                    key={sec}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-100" onClick={()=>handleSkip(sec)}
                  >
                    {sec > 0 ? `+${sec}s` : `${sec}s`}
                  </button>
                ))}
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata & Submission */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4">Metadata & Submission</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Content Type</label>
            <select className="w-full border rounded-lg p-2 mt-1" onChange={(e) => setMeta(prev => ({ ...prev, contentType: e.target.value }))}>
              <option>Select type...</option>
              <option>Advertisement</option>
              <option>Song</option>
              <option>Program</option>
               <option>Jingle</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Channel</label>
            <select className="w-full border rounded-lg p-2 mt-1" onChange={(e) => setMeta(prev => ({ ...prev, channel: e.target.value }))}>
              <option>Select Channel...</option>
              <option>Radio City</option>
              <option>Radio Tadka</option>
              <option>Fever Fm</option>
               <option>Big Fm</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Start Time</label>
            <input type="time" step={1} className="w-full border rounded-lg p-2 mt-1" onChange={(e) => setMeta(prev => ({ ...prev, starttime: e.target.value }))}/>
          </div>
          <div>
            <label className="block text-sm font-medium">End Time</label>
            <input type="time" step={1} className="w-full border rounded-lg p-2 mt-1" onChange={(e) => setMeta(prev => ({ ...prev, endtime: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium" >Duration</label>
            <input className="w-full border rounded-lg p-2 mt-1" placeholder="Duration..."onChange={(e) => setMeta(prev => ({ ...prev, duration: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium" >Program</label>
      
      {/* Searchable dropdown */}
      <CreatableSelect
        options={options}
        value={options.find(opt => opt.value === meta.program) || null}
        onChange={handleChange}
        placeholder="Select or type..."
        isClearable
        isSearchable
      />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100">
            Save Draft
          </button>
          <button className="px-6 py-2 rounded-lg bg-purple-600 text-white shadow-md rounded-xl hover:bg-purple-700" onClick={submitMetadata}>
            Submit Metadata
          </button>
        </div>
      </div>
    </div>
  );
}

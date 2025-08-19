import React,{useState,useRef} from "react";
import { Info, Play, X } from "lucide-react";
import EditModal from "./EditModal";
import axios from "axios";

export default function Timeline({audio}) {
  // Generate 15-min intervals
  const intervals = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      intervals.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  const [selectedSegment, setSelectedSegment] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const[file,setFile]=useState("");
    const audioRef = useRef(null);
  const segments = [
  {
    id: "Ad_1",
    label: "Brand XYZ Product Launch",
    type: "Advertisement",
    status: "auto-labelled",
    start: "08:15:30",
    end: "08:16:54",
    confidence: "98.5%",
    title: "Brand XYZ Product Launch",
    campaign: "Summer Sale 2025",
    advertiser: "Brand XYZ Corp",
    detectionMethod: "Fingerprint Matching",
  },
  {
    id: "Song_1",
    label: "Bollywood Hit Song",
    type: "Music",
    status: "auto-labelled",
    start: "00:18:40",
    end: "00:20:45",
    confidence: "99.1%",
    campaign: null,
    title: "Bollywood Hit Song",
    advertiser: null,
    detectionMethod: "Audio Match",
  },
];
 const dataBlocks = segments.map(seg => ({
  ...seg, // keep all properties
  label: seg.label.charAt(0) + "..." // short label for the bar
}));

const handleBarClick = (segment) => {
  setSelectedSegment(segment);
  setIsModalOpen(true);
};
  
    const timeToSeconds = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 3600 + m * 60;
  };
const handleAudio = async(start, end) => {
  console.log(audio);
  console.log(start,end);
    const response = await axios.get("http://localhost:3001/clip", {
      params: {
        filePath: audio.filePath,  // full path or relative name
        startTime: start,
        endTime: end,
      },
      responseType: "blob", // 👈 important for audio
    });

    // Convert blob to URL
    const audioBlob = new Blob([response.data], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setFile(audioUrl); // <-- ensures <audio src={file} /> is visible

    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
      };
    }
};


  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm">24-Hour Timeline Grid</h3>
        <span className="text-xs text-red-600 border border-red-300 px-2 py-0.5 rounded-full">
          4 Total Fingerprint Matches
        </span>
      </div>

      {/* Top Timeline */}
      <div className="overflow-x-auto">
        <div className="flex">
          {intervals.map((time, idx) => (
            <div
              key={idx}
              className="min-w-[240px] h-6 flex items-center justify-center text-[10px] text-gray-600 border-r border-gray-200"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Bottom Data Bar */}
        <div className="relative flex">
          {intervals.map((slotStart, idx) => {
            const [sh, sm] = slotStart.split(":").map(Number);
            const slotStartSec = sh * 3600 + sm * 60;
            const slotEndSec = slotStartSec + 15 * 60;
            const slotBlocks = dataBlocks.filter((block) => {
              const startSec = timeToSeconds(block.start);
              return startSec >= slotStartSec && startSec < slotEndSec;
            });

            return (
              <div
                key={idx}
                className="relative min-w-[240px] h-20 border-r border-gray-200 bg-gray-100"
              >
                {slotBlocks.map((block, i) => {
                  const blockStartSec = timeToSeconds(block.start);
                  const blockEndSec = timeToSeconds(block.end);
                  const slotDurationSec = slotEndSec - slotStartSec;
                  const slotWidthPx = 240;

                  const leftPx =
                    ((blockStartSec - slotStartSec) / slotDurationSec) * slotWidthPx;
                  const widthPx =
                    ((blockEndSec - blockStartSec) / slotDurationSec) * slotWidthPx;

                  return (
                    <div
                      key={i}
                      className="absolute top-0 h-full bg-green-500 text-white text-[10px] flex items-center justify-center rounded-sm"
                      style={{
                        left: `${leftPx}px`,
                        width: `${Math.max(widthPx, 2)}px`,
                      }}
                      onClick={() => handleBarClick(block)}
                    >
                      {block.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
        <div className="flex items-center gap-6 mb-4 mt-4">
            {/* Matching Segments */}
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span className="text-sm text-gray-700 font-medium">Matching Segments</span>
            </div>

            {/* No Content */}
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                <span className="text-sm text-gray-700 font-medium">No Content</span>
            </div>
            </div>
        <h4 className="flex items-center gap-2 font-medium text-green-700 mb-2">
          ✅ Matching Segments ({segments.length})
        </h4>
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-green-50 border border-green-200 rounded-lg p-3 mb-2"
          >
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-mono text-blue-600">{seg.start}</span>
                <span>-</span>
                <span className="font-mono">{seg.end}</span>
              </div>
              {/* <p className="text-sm font-medium text-gray-800">{seg.title}</p> */}
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                {seg.label}
              </span>
              <span className="text-xs text-gray-500">{seg.confidence}</span>
            </div>
          </div>
        ))}
        {isModalOpen && selectedSegment && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[700px] shadow-lg overflow-hidden">
        
        {/* Header */}
       <div className="flex items-center justify-between px-6 pt-6 border-b pb-4">
        {/* Left side: Info + Title */}
        <div className="flex items-center gap-2">
          <Info className="text-blue-500" size={20} />
          <h2 className="text-lg font-semibold">Timeline Segment Details</h2>
        </div>

        {/* Right side: Close button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X size={22} />
        </button>
      </div>
        <p className="text-sm text-gray-500 px-6 mb-4 text-left pt-2 ">
          Detailed information for segment at {selectedSegment.start}
        </p>

        {/* Segment Overview */}
        <div className="border rounded-lg mx-6 mb-4 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-orange-500">⚠️</span>
            <h3 className="font-semibold">Segment Overview</h3>
          </div>
          <div className="grid grid-cols-3 gap-y-2">
            <p><strong>Label:</strong> {selectedSegment.label}</p>
            <p><strong>Type:</strong> {selectedSegment.type}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedSegment.status}
              </span>
            </p>
            <p>
              <strong>Confidence:</strong>{" "}
              <span className="text-green-600">{selectedSegment.confidence}%</span>
            </p>
            <p><strong>Start Time:</strong> {selectedSegment.start}</p>
            <p><strong>End Time:</strong> {selectedSegment.end}</p>
          </div>
        </div>

        {/* Content Details */}
        <div className="border rounded-lg mx-6 mb-4 p-4">
          <h3 className="font-semibold mb-2">Content Details</h3>
          <div className="grid grid-cols-2">
            <p><strong>Campaign:</strong> {selectedSegment.campaign || "-"}</p>
            <p><strong>Advertiser:</strong> {selectedSegment.advertiser || "-"}</p>
          </div>
        </div>

        {/* Analysis Information */}
        <div className="border rounded-lg mx-6 mb-6 p-4">
          <h3 className="font-semibold mb-2">Analysis Information</h3>
          <div className="grid grid-cols-2">
            <p><strong>Detection Method:</strong> {selectedSegment.detectionMethod}</p>
            <p><strong>Clip ID:</strong> {selectedSegment.id}</p>
          </div>
        </div>
        {file &&  <div className="mt-4 flex justify-center mb-4">
          <audio 
            ref={audioRef} 
            src={file} 
            controls 
            className="w-full max-w-md"
          />
          </div>
          }

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">
          <button
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-300"
          >
           Save
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded flex items-center gap-2 hover:bg-gray-100">
            <Play size={16} className="text-blue-500" onClick={()=>handleAudio(selectedSegment.start,selectedSegment.end)}/>
            Play Audio
          </button>
          <button onClick={() => {
                 setEditFormData(selectedSegment); // pre-fill with segment data
                 setEditModalOpen(true);
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Request Changes
          </button>
      </div>
    </div>
  </div>
    )}
   <EditModal open={editModalOpen}
         setOpen={setEditModalOpen}
         editFormData={editFormData}
         setEditFormData={setEditFormData}
         onSave={() => console.log("Saved:", editFormData)}/>
      </div>
  
  );
}

import React, { useState } from "react";
import YoutubeVideoCard from "../components/YoutubeVideoCard";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null, []);

  const ipcHandle = async () => {
    setVideoInfo(null)
    window.electron.ipcRenderer.send('SEARCH_VIDEO', videoUrl)

    window.electron.ipcRenderer.on('SEARCH_VIDEO', (event, result) => {
      console.log(videoInfo);
      setVideoInfo(JSON.parse(result));
    });
  }

  // https://www.youtube.com/watch?v=LXb3EKWsInQ

  return (
    <div className='p-10 w-full'>
      <div className="flex mb-5">
        <div className="flex-1 pr-1">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Youtube URL"
            className="p-1 border focus:border-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="flex-none w-40"><button
          className="bg-blue-500 rounded-md text-white hover:bg-blue-600 w-full h-full cursor-pointer"
          onClick={ipcHandle}
        >
          Search
        </button></div>
      </div>

      { videoInfo ? <YoutubeVideoCard videoInfo={videoInfo} /> : <></> }

    </div>
  );
};

export default Index;
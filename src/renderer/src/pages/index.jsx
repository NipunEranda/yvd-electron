import React, { useState } from "react";

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
      <div className="flex justify-center w-full">
        <img src={videoInfo ? videoInfo.info.thumbnails.sort((a, b) => b.width - a.height)[0].url : ''} className="w-1/4" />
      </div>
      <div className="w-full text-center mt-5">
        <span className="text-2xl font-semibold">{videoInfo ? videoInfo.info.title : ''}</span>
      </div>
      {videoInfo ? <div className="mt-2">
        {videoInfo.qualities.sort((a, b) => a.quality.contentLength - b.quality.contentLength).map((quality, index) => (
          <div key={index} className="w-full flex justify-center">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer">
              {quality.qualityLabel} - {parseFloat(quality.contentLength / 8000000).toFixed(2)}MB
            </button>
          </div>
        ))}
      </div> : <></>}

    </div>
  );
};

export default Index;
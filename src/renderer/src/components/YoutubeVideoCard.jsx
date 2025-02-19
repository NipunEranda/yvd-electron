import { useState } from 'react'
import testImage from "../assets/img/test.png"

function YoutubeVideoCard({ videoInfo }) {
    const qualities = {};

    (videoInfo ? videoInfo.qualities : []).map(quality => {
        if (!qualities[quality.qualityLabel])
            qualities[quality.qualityLabel] = [];

        qualities[quality.qualityLabel].push(quality);
    });

    const [state, setState] = useState({
        enableAudio: true,
        enableVideo: true,
        selectedVideoQuality: "0"
    });

    const updateState = (key, value) => {
        setState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <div className='w-full flex flex-wrap'>
            <div className="flex items-center bg-white border border-zinc-200 rounded-lg shadow-sm dark:border-zinc-700 dark:bg-zinc-800 w-full">
                <img className="object-cover w-64 rounded-t-lg h-96 md:h-auto lg:w-96 md:rounded-none md:rounded-s-lg bg-cover" src={videoInfo ? videoInfo.info.thumbnails.sort((a, b) => b.width - a.height)[0].url : ''} alt="" />
                <div className="flex flex-col justify-between p-3 leading-normal w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{videoInfo ? videoInfo.info.title : ''}</h5>
                    <div className='flex flex-wrap w-full'>
                        <div className="p-3 w-full bg-white border-0 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
                            <div className="flex items-center">
                                <input id="audio" type="checkbox" name="enableAudio" checked={state.enableAudio} onChange={(e) => updateState(e.target.name, e.target.checked)} className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600 cursor-pointer" />
                                <label htmlFor="audio" className="ms-2 text-sm font-medium text-zinc-900 dark:text-zinc-300 cursor-pointer">Audio</label>
                            </div>
                        </div>
                        <div className="p-3 w-full bg-white border-0 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
                            <div className="flex items-center">
                                <input id="video" type="checkbox" name="enableVideo" checked={state.enableVideo} onChange={(e) => updateState(e.target.name, e.target.checked)} className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600 cursor-pointer" />
                                <label htmlFor="video" className="ms-2 text-sm font-medium text-zinc-900 dark:text-zinc-300 cursor-pointer">Video</label>
                            </div>
                            <div className="w-full mt-2 mb-2">
                                <div className="w-full">
                                    <label htmlFor="videoQualities" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Select an option</label>
                                    <select id="videoQualities" name="selectedVideoQuality" value={state.selectedVideoQuality} onChange={(e) => updateState(e.target.name, e.target.value)} className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
                                        <option value="0">Choose a video quality</option>
                                        {Object.keys(qualities).map((quality, index) => (
                                            <option key={index} value={quality}>{quality}</option>
                                        ))}
                                    </select>
                                    {videoInfo ? <div className="mt-2">
                                        {(qualities[state.selectedVideoQuality] ? qualities[state.selectedVideoQuality] : []).sort((a, b) => a.quality.contentLength - b.quality.contentLength).map((quality, index) => (
                                            <button disabled={true} key={index} type="button" className={(state.enableVideo ? 'cursor-pointer bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ' : 'cursor-not-allowed bg-zinc-400 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-600 dark:focus:ring-zinc-800 ') + "text-white mr-2 focus:ring-4 focus:ring-blue-300 font-medium px-2 py-1 rounded-lg text-sm mb-2 focus:outline-none"}>
                                                {quality.qualityLabel} - {parseFloat(quality.contentLength / 8000000).toFixed(2)}MB
                                            </button>
                                        ))}
                                    </div> : <></>}
                                </div>
                            </div>
                            {((state.enableVideo ? state.selectedVideoQuality == "0" ? false : true : state.enableAudio ? true : false)) ? <div className='w-full'>
                                <button type="button" className="p-1 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">Download</button>
                            </div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YoutubeVideoCard;
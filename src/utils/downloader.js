// const ytdl = require("@distube/ytdl-core");
import ytdl from "@distube/ytdl-core";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg"

let bestAudio;
let videoQualties = [];

async function video(url, quality) {
    await new Promise((resolve) => {
        ytdl(url, { filter: format => format.container === 'mp4' && 'videoonly' }).pipe(fs.createWriteStream("video.mp4")).on('close', () => {
            resolve();
        });
    });
}

async function audio(url, quality) {
    await new Promise((resolve) => {
        ytdl(url, { filter: 'audioonly', quality }).pipe(fs.createWriteStream("audio.mp4")).on('close', () => {
            resolve();
        });
    });
}

async function combineAudioVideo(videoPath, audioPath, outputPath) {
    return await new Promise((resolve) => {
        ffmpeg(videoPath)
            .input(audioPath)
            .outputOptions([
                '-c:v copy', // Copy the video stream without re-encoding
                '-c:a aac',  // Encode the audio to AAC
                '-threads 8', // Use 8 threads (adjust based on your CPU)
                '-strict experimental', // Allow experimental codecs if needed
                '-shortest', // Match the duration to the shortest stream
            ])
            .output(outputPath)
            .on('end', () => {
                // console.log('Audio and video have been combined successfully!');
                resolve();
            })
            .on('error', (err) => {
                console.error('Error combining audio and video: ' + err.message);
            })
            .run()
    });
}

// await Promise.all([video(url), audio(url)]);

// await combineAudioVideo("video.mp4", "audio.mp4", "output.mp4");

// console.log("completed");

async function init(url) {
    // const url = "https://www.youtube.com/watch?v=LXb3EKWsInQ"
    if (!url)
        url = "https://www.youtube.com/watch?v=vHPMF5L-fo4"

    const videoInfo = await ytdl.getInfo(url);

    bestAudio = videoInfo.formats.filter(f => !f.hasVideo && f.hasAudio).sort((a, b) => b.contentLength - a.contentLength)[0];

    videoInfo.formats.filter(f => f.hasVideo && !f.hasAudio).sort((a, b) => b.contentLength - a.contentLength).map(quality => {
        if (!videoQualties.filter(vq => vq.itag == quality.itag)[0])
            videoQualties.push(quality);
    })

    return { audio: bestAudio, qualities: videoQualties, info: videoInfo.videoDetails }
}

export default { init }
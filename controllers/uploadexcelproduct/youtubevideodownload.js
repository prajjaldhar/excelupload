const ytdl = require("ytdl-core");

const youtubevideodownload = async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send("No video URL provided");
  }

  try {
    // Validate YouTube URL
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).send("Invalid YouTube URL");
    }

    // Get video info (like title) for file naming
    const videoInfo = await ytdl.getInfo(videoUrl);
    const title = videoInfo.videoDetails.title;

    // Set headers to download the video with chunked encoding
    res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
    res.setHeader("Content-Transfer-Encoding", "chunked");

    // Stream and download the video in mp4 format with lower quality
    ytdl(videoUrl, {
      quality: "lowest", // Fastest download with lowest quality
      format: "mp4",
    }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).send("Error downloading video");
  }
};

module.exports = youtubevideodownload;

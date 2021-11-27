const express = require("express");
const fs = require("fs");
const ytdl = require("ytdl-core");

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to youtube downloader service!");
});

app.post("/download", async (req, res) => {
  let videoUrl = req.body.url;

  let info = await ytdl.getBasicInfo(videoUrl);
  let title = info.videoDetails.title;
  let fileName = title.replaceAll(" ", "_");
  let videoId = info.videoDetails.videoId;
  let duration = info.videoDetails.lengthSeconds;

  if (!info) {
    res.status(400).send({ error: "URL invalid, try again!" });
  }

  ytdl(videoUrl).pipe(fs.createWriteStream(fileName));
  //res.download('video.mp4')
  //res.setHeader("Content-Disposition", "attachment; video.mp4");
  res.status(200).send({
    success: `Downloading: ${title} - id: (${videoId}) - Duration: ${Math.round(
      duration / 60
    )} min.`,
  });
});

app.listen(PORT, () => {
  console.log(`O servidor de download está rodando na porta ${PORT}`);
});

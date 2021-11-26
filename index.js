const express = require('express')
const fs = require('fs')
const ytdl = require('ytdl-core')

const app = express()
const PORT = 3000
app.use(express.json());


app.get('/', async (req, res) => {
  await res.send('boa!')
})


app.post('/download', async (req, res) => {
  let videoUrl = req.body.url || `http://www.youtube.com/watch?v=aqz-KE-bpKQ`

  await ytdl(videoUrl).pipe(fs.createWriteStream('video.mp4'))
  
  let info = await ytdl.getBasicInfo(videoUrl)
  let title = info.videoDetails.title
  let videoId = info.videoDetails.videoId
  let duration = info.videoDetails.lengthSeconds
  //res.download('video.mp4')
  //res.setHeader("Content-Disposition", "attachment; video.mp4");
  res.send({success:`executando download de: ${title} - id: (${videoId}) - ${Math.round(duration / 60)} min.`})
})

app.listen(PORT, () => {
  console.log(`O servidor de download está rodando na porta ${PORT}`)
})
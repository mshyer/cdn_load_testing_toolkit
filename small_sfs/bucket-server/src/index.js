import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import Filepaths from './utils/filepaths';

const app = express();
const PORT = 4501;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("received a request from user agent: " + req.headers['user-agent'])
  next();
})

app.use('/static', express.static('public/assets'));

app.get('/', (req, res) => {
  res.status(200).json({
    message: "success",
  })
});
app.get('/allImages', (req, res) => {
  const imagePaths = Filepaths.allImages();
  res.status(200).json({
    data: imagePaths,
  })
})
app.get('/allStylesheets', (req, res) => {
  const stylesheetPaths = Filepaths.allStylesheets();
  res.status(200).json({
    data: stylesheetPaths,
  })
})
app.get('/allVideos', (req, res) => {
  const videoPaths = Filepaths.allVideo();
  res.status(200).json({
    data: videoPaths,
  })
})
app.get('/allHtml', (req, res) => {
  const htmlPaths = Filepaths.allHtml();
  res.status(200).json({
    data: htmlPaths,
  })
})
app.get('/allJs', (req, res) => {
  const jsPaths = Filepaths.allJs();
  res.status(200).json({
    data: jsPaths,
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
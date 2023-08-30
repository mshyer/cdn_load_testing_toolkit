const fs = require('fs');

//FOR LOCAL USE
// const IMAGE_PATH = '../../public/assets/images';
// const STYLESHEETS_PATH = '../../public/assets/stylesheets';
// const JS_PATH = '../../public/assets/js';
// const VIDEO_PATH = '../../public/assets/video';
// const HTML_PATH = '../../public/assets/html';

//FOR USE WITH EXPRESS
const IMAGE_PATH = 'public/assets/images';
const STYLESHEETS_PATH = 'public/assets/stylesheets';
const JS_PATH = 'public/assets/js';
const VIDEO_PATH = 'public/assets/video';
const HTML_PATH = 'public/assets/html';


const validFilepath = (filePath) => {
  return filePath.endsWith('.jpg') ||
    filePath.endsWith('.mp4') ||
    filePath.endsWith('.png') ||
    filePath.endsWith('.css') ||
    filePath.endsWith('.html') ||
    filePath.endsWith('.js');
};

const filePathToHttpPath = (folderPath, file) => {
  const rgx = /(images|video|html|stylesheets|js).*$/;
  const publicHttpAssetPath = folderPath.match(rgx);
  
  return `${publicHttpAssetPath[0]}/${file}`;
};

const traverseFolder = (folderPath, collection) => {
  const files = fs.readdirSync(folderPath);
  const httpPath = filePathToHttpPath(folderPath)
  files.forEach((file) => {
    const filePath = `${folderPath}/${file}`;
    const stats = fs.statSync(filePath);

    if (!stats.isDirectory() && validFilepath(file)) {
      const httpPath = filePathToHttpPath(folderPath, file);

      collection.push(`${httpPath}`);
    } else if (stats.isDirectory()) {
      traverseFolder(filePath, collection)
    }
  });
}

export const allImages = () => {
  const images = [];
  traverseFolder(IMAGE_PATH, images)
  return images;
};

export const allStylesheets = () => {
  const stylesheets = [];
  traverseFolder(STYLESHEETS_PATH, stylesheets)
  return stylesheets;
};

export const allVideo = () => {
  const video = [];
  traverseFolder(VIDEO_PATH, video)
  return video;
};

export const allHtml = () => {
  const html = [];
  traverseFolder(HTML_PATH, html)
  return html;
};

export const allJs = () => {
  const js = [];
  traverseFolder(JS_PATH, js)
  return js;
};

export const randomFileOfType = (fileType) => {
  let randIdx;
  switch (fileType) {
    case "html":
      const htmlFiles = allHtml();
      randIdx = Math.floor(Math.random() * htmlFiles.length);
      return htmlFiles[randIdx];
    case "js":
      const jsFiles = allJs();
      randIdx = Math.floor(Math.random() * jsFiles.length);
      return jsFiles[randIdx];
    case "video":
      const videoFiles = allVideo();
      randIdx = Math.floor(Math.random() * videoFiles.length);
      return videoFiles[randIdx];
    case "stylesheet":
      const cssFiles = allStylesheets();
      randIdx = Math.floor(Math.random() * cssFiles.length);
      return cssFiles[randIdx];
    case "image":
      const imageFiles = allImages();
      randIdx = Math.floor(Math.random() * imageFiles.length);
      return imageFiles[randIdx];
  }
  return "error";
}

// console.log(randomFileOfType("html"));
// console.log(randomFileOfType("js"));
// console.log(randomFileOfType("video"));
// console.log(randomFileOfType("stylesheet"));
// console.log(randomFileOfType("image"));
// console.log(allStylesheets());
const Filepaths = {
  allImages,
  allVideo,
  allStylesheets,
  allJs,
  allHtml,
  randomFileOfType
};
export default Filepaths
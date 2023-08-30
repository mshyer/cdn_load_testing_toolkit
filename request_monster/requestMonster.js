// the static URL is the URL of the static file server (used with Small_SFS)
const STATIC_URL = '';
const BASE_URL = STATIC_URL + "/";
const STATIC_BASE_URL = `${STATIC_URL}/static/`;
const FETCH_RATE = 500; //milliseconds



// Fetches an up-to-date list of all static URL paths on the server
const fetchData = async () => {
  const imagesPromise = fetch(BASE_URL + "allImages")
  const stylesheetsPromise = fetch(BASE_URL + "allStylesheets")
  const videoPromise = fetch(BASE_URL + "allVideos")
  const htmlPromise = fetch(BASE_URL + "allHtml")
  const jsPromise = fetch(BASE_URL + "allJs")

  const dataPromises = [
    imagesPromise, stylesheetsPromise,
    videoPromise, htmlPromise, jsPromise
  ];

  let images;
  let stylesheets;
  let videos;
  let html;
  let js;
  return await Promise.allSettled(dataPromises)
    .then( async ([imageP, styleP, videoP, htmlP, jsP]) => {
      const imageRes = imageP.value;
      const styleRes = styleP.value;
      const videoRes = videoP.value;
      const htmlRes = htmlP.value;
      const jsRes = jsP.value;
      images = await imageRes.json();
      stylesheets = await styleRes.json();
      videos = await videoRes.json();
      html = await htmlRes.json();
      js = await jsRes.json();
      return {
        images: images.data,
        stylesheets: stylesheets.data,
        videos: videos.data,
        html: html.data,
        js: js.data
      }
  })
  .catch((error) => {
    console.log("an error occurred: " + error);
  })
}

let data;

// Returns a random url for a static file on the server of type fileType
const randomFileOfType = (fileType) => {
  let randIdx;
  switch (fileType) {
    case "html":
      randIdx = Math.floor(Math.random() * data.html.length);
      return data.html[randIdx];
    case "js":
      randIdx = Math.floor(Math.random() * data.js.length);
      return data.js[randIdx];
    case "video":
      randIdx = Math.floor(Math.random() * data.videos.length);
      return data.videos[randIdx];
    case "stylesheet":
      randIdx = Math.floor(Math.random() * data.stylesheets.length);
      return data.stylesheets[randIdx];
    case "image":
      randIdx = Math.floor(Math.random() * data.images.length);
      return data.images[randIdx];
  }
  return "error";
};

// This function preferentially returns static image urls
const weightedRandomFile = () => {
  const IMAGE_WEIGHT = 0.5;
  let diceRoll = Math.random();

  if (diceRoll > IMAGE_WEIGHT) {
    return randomFileOfType("image")
  } else {
    const options = ["stylesheet", "video", "js", "html"];
    diceRoll = Math.floor(Math.random() * options.length);
    return randomFileOfType(options[diceRoll]);
  }

};

// Request monster is hungry
const infiniteTimedFetch = () => {
  console.log("fetching static", STATIC_BASE_URL)
  setInterval(() => {
    const staticPath = weightedRandomFile();
    fetch(STATIC_BASE_URL + staticPath, {
      headers: {
        'Cache-Control': 'Public',
        'Max-Age': '10000',
      }
    })
      .then(response => {
        console.log(response.headers);
        return response.blob()}
        )
      .then(blob => console.log("fetched a blob of type " + blob.type))
  }, FETCH_RATE)
};


// CODE EXECUTION HERE
(async () => {
  data = await fetchData();
  infiniteTimedFetch();
})()






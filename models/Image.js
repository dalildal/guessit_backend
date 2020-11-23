"strict mode";

const FILE_PATH = __dirname + "/../data/images.json";

class Image {
  constructor(data) {
    this.id = Image.nextImageId();
    this.nbLetters = data.nbLetters;
    this.roundTime = data.roundTime;
    this.nbRound = data.nbRound;
  }


  static nextImageId() {
    let imageList = getImageListFromFile(FILE_PATH);
    if (imageList.length === 0) return 1;
    return imageList[imageList.length - 1].id + 1;
  }

  save() {
    let imageList = getImageListFromFile(FILE_PATH);
    imageList.push(this);
    saveImageListToFile(FILE_PATH, imageList);
  }

  static get(id) {
    let imagesList = getImageListFromFile(FILE_PATH);
    return imagesList.find((image) => image.id == id);
  }

  static get list() {
    return getImageListFromFile(FILE_PATH);
  }
}

  function getImageListFromFile(filePath) {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return [];
  let imageListRawData = fs.readFileSync(filePath);
  let imageList;
  if (imageListRawData) imageList = JSON.parse(imageListRawData);
  else imageList = [];
  return imageList;
  }

  function saveImageListToFile(filePath, imageList) {
  const fs = require("fs");
  let data = JSON.stringify(imageList);
  fs.writeFileSync(filePath, data);
  }

module.exports = Image;

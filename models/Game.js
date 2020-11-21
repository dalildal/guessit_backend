"strict mode";

const FILE_PATH = __dirname + "/../data/games.json";

class Game {
  constructor(data) {
    this.id = Game.nextGameId();
    this.nbPlayer = data.nbPlayer;
    this.roundTime = data.roundTime;
    this.nbRound = data.nbRound;
  }


  static nextGameId() {
    let gameList = getGameListFromFile(FILE_PATH);
    if (gameList.length === 0) return 1;
    return gameList[gameList.length - 1].id + 1;
  }

  save() {
    let gameList = getGameListFromFile(FILE_PATH);
    gameList.push(this);
    saveGameListToFile(FILE_PATH, gameList);
  }

  static get(id) {
    let gamesList = getGameListFromFile(FILE_PATH);
    return gamesList.find((game) => game.id == id);
  }

  static get list() {
    return getGameListFromFile(FILE_PATH);
  }
}

  function getGameListFromFile(filePath) {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return [];
  let gameListRawData = fs.readFileSync(filePath);
  let gameList;
  if (gameListRawData) gameList = JSON.parse(gameListRawData);
  else gameList = [];
  return gameList;
  }

  function saveGameListToFile(filePath, gameList) {
  const fs = require("fs");
  let data = JSON.stringify(gameList);
  fs.writeFileSync(filePath, data);
  }

module.exports = Game;

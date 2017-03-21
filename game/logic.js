/** Game Logic */

function Game (playerIds){
  this.id = gameIdGenerator(playerIds);
  this.playerIds = playerIds;
  this.smallMosque = {
    leftCost: 1,
    rightCost: 1
  };
  this.greatMosque = {
    leftCost: 1,
    rightCost: 1
  };
  this.largeMarket = {
    demandTile: { fruit: 2, spice: 1, fabric: 2 }
  };
  this.smallMarket = {
    demandTile: { jewelry: 2, spice: 2, fabric: 1 }
  };
  this.caravansary = {
    bonusCards: {}
  };
  this.gemstoneDealer = 12;
  this.playerTurn = this.playerIds[0];
  this.locations = {};
  this.merchants = {};

  playerIds.forEach((id, i) => {
    this.merchants[id] = new Merchant(id, i);
  });
}

function gameIdGenerator(arrayOfPlayerIds){
  let gameId = '';
  arrayOfPlayerIds.forEach(playerId => {
    gameId += playerId.slice(0,5)
  })
  return gameId
}

function Merchant (id, i){
  this.id = id;
  this.number = i;
  this.position = new Position();
  this.assistants = {};
  this.bonusCards = {};
  this.wheelbarrow = {
    fabric: 0,
    fruit: 0,
    jewelry: 0,
    money: i+2,
    ruby: 0,
    size: 3,
    spice: 0
  };
  this.abilities = {};

  for (let i = 0; i < 4; i++){
    this.assistants[i] = new Assistant(i); // initialize assistants
  }
}

function Assistant (id){
  this.id = id;
  this.position = '0,0';
}

function Position (coords = '0,0', possibleMoves = ['1,0', '2,0', '0,1', '1,1', '0,2']) {
  this.coordinates = coords;
  this.possibleMoves = possibleMoves;
}

module.exports = Game;
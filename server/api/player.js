const admin = require('firebase-admin');
const db = admin.database();
const gamesRef = db.ref('games');

const Game = require('./logic');

const router = module.exports = require('express').Router();

/**
 * Player routes
 * ...api/player/...
 */

router.param(':gameId', (req, res, next) => {

  gamesRef.once('value', function(snapshot){
    return snapshot;
  }).then(snapshot => {
    req.game = snapshot;
    next();
  })

});

// get all players
router.get('/:gameId/:playerId', (req, res, next) => {
  
});

// router.param(':playerId', (req, res, next) => {

// });
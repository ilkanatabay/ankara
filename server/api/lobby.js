'use strict';

const admin = require('firebase-admin');
const db = admin.database();
const sessionRef = db.ref('session');

const express = require('express');
const router = express.Router();
module.exports = router;

// TODO: send response (res.send)
router.put('/:userId', function (req, res, next) {
  const userId = req.playerId;

  //add user to the game
  db.ref('/session').child('connectedPlayers').once("value", function(data) {
    console.log('data', data);
  });

  console.log('adding user', userId, 'to the game'  );
  const data = {};
  data[userId] = true;
  const ref = db.ref(`/session`).child('connectedPlayers');
  ref.update(data);

});

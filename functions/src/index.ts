import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {generateBoard} from './services/game.service';
import {
  GameActionRequest,
  GenerateGameRequest,
} from './interfaces/request.interface';

admin.initializeApp();

exports.generateGame = functions.https.onCall(async (request) => {
  const {size, mines} = request.body as GenerateGameRequest;

  if (size >= 4 && mines >= 1) {
    const result = await admin
        .firestore()
        .collection('games')
        .add(generateBoard(size, mines));

    return {id: result.id};
  }

  functions.logger.error('Unable to create game', request.body);

  return {error: 'Something terrible has happened, please provide appropriate size and mines.'};
});

exports.gameAction = functions.https.onCall(async (request) => {
  const {board, tile} = request.body as GameActionRequest;

  if (board && tile) {
    const result = await admin
        .firestore()
        .collection('games')
        .add(generateBoard(board.height, board.mines));

    return {id: result.id};
  }

  functions.logger.error('Unable to create game', request.body);

  return {error: 'Something terrible has happened, please provide appropriate size and mines.'};
});

exports.addNumbers = functions.https.onCall((data) => {
  const firstNumber = data.firstNumber;
  const secondNumber = data.secondNumber;

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'two arguments "firstNumber" and "secondNumber" which must both be numbers.');
  }

  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: '+',
    operationResult: firstNumber + secondNumber,
  };
});

exports.createNewUser = functions.auth.user().onCreate(async (user, context) => {
  admin.firestore()
      .collection('users')
      .doc(user.uid)
      .create({
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid,
      })
      .catch((reason) => {
        functions.logger.error('Unable to create user.', user, context, reason);
      });
});

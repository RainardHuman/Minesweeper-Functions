import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {generateBoard} from './services/game.service';
import {GenerateGameRequest, LogRequest} from './interfaces/request.interface';

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

exports.log = functions.https.onCall((request) => {
  const {level, message, data} = request.body as LogRequest;
  switch (level) {
    case 'warn': functions.logger.warn(message, data); break;
    case 'error': functions.logger.error(message, data); break;
    default: functions.logger.info(message, data);
  }
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

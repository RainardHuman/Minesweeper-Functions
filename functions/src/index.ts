import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {generateBoard} from './services/game';

admin.initializeApp();

export const generateGame = functions.https.onRequest(async (request, response) => {
  const {size, mines} = request.body;

  if (size >= 4 && mines >= 1) {
    const result = await admin.firestore()
        .collection('games')
        .add(generateBoard(size, mines));
    response.status(200).send(result.id);
  }
  response.status(400).send('size >= 4 && mines >= 1');
});

export const createNewUser = functions.auth.user().onCreate(async (user, context) => {
  await admin.firestore()
      .collection('users')
      .doc(user.uid)
      .create({
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid,
      })
      .catch((reason) => {
        functions.logger.error('Terrible level, could not create new user', user, context, reason);
      });
});

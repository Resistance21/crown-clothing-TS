import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { User } from "firebase/auth";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
  userSignOut,
  createAuthUserWithEmailAndPassword,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";

import {
  signInFailure,
  signInSuccess,
  signOutUserFailed,
  signOutUserSuccess,
  signUpUserFailed,
  EmailSignInStart,
  SignUpUser,
  signUpUserSuccess,
} from "./user.actions";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    console.log("in snapshot");
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* userGoogleSignIn() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* userEmailSignIn({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signOutUser() {
  try {
    yield* call(userSignOut);
    yield* put(signOutUserSuccess());
  } catch (error) {
    yield* put(signOutUserFailed(error as Error));
  }
}

export function* signUpUser({
  payload: { email, password, displayName },
}: SignUpUser) {
  try {
    console.log("in sign up", email, password);
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      /*       const userAuth = {
        displayName,
        email,
        uid: user.uid,
      }; */
      yield* put(signUpUserSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpUserFailed(error as Error));
  }
}

export function* onGoogleSignInStart() {
  console.log("google start");
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, userGoogleSignIn);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, userEmailSignIn);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOutUser);
}

export function* onSignUpUserStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP, signUpUser);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpUserStart),
  ]);
}

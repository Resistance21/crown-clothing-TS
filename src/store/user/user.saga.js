import { takeLatest, all, call, put } from "redux-saga/effects";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
  userSignOut,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import {
  signInFailure,
  signInSuccess,
  signOutUserFailed,
  signOutUserSuccess,
  signUpUserFailed,
} from "./user.actions";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
  try {
    console.log("in snapshot");
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* userGoogleSignIn() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* userEmailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOutUser() {
  try {
    const user = yield call(userSignOut);
    yield put(signOutUserSuccess(user));
  } catch (error) {
    yield put(signOutUserFailed(error));
  }
}

export function* signUpUser({ payload: { email, password, displayName } }) {
  try {
    console.log("in sign up", email, password);
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    const userAuth = {
      displayName,
      email,
      uid: user.uid,
    };
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signUpUserFailed(error));
  }
}

export function* onGoogleSignInStart() {
  console.log("google start");
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, userGoogleSignIn);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, userEmailSignIn);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOutUser);
}

export function* onSignUpUserStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP, signUpUser);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpUserStart),
  ]);
}

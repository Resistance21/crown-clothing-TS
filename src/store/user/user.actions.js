import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password,
  });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FALURE, error);

export const signOutUser = () => createAction(USER_ACTION_TYPES.SIGN_OUT);

export const signOutUserSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, user);

export const signOutUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export const signUpUser = (email, password, displayName) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP, {
    email,
    password,
    displayName,
  });
};
export const signUpUserSuccess = () => {
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS);
};
export const signUpUserFailed = (error) => {
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
};

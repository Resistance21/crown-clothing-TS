import { AnyAction } from "redux";
import {
  signInFailure,
  signInSuccess,
  signOutUserSuccess,
  signOutUserFailed,
  signUpUserFailed,
} from "./user.actions";

import { UserData } from "../../utils/firebase/firebase.utils.js";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITAL_STATE, action = {} as AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }
  if (signInFailure.match(action)) {
    return {
      ...state,
      error: action.payload,
    };
  }
  if (signOutUserSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }
  if (signOutUserFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
    };
  }
  if (signUpUserFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
    };
  }
  return state;
};

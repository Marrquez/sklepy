import { createReducer, on } from '@ngrx/store';
import { AddUser } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  name: string;
  uid: string;
  isAdmin: boolean;
}

export const initialState: UserState = {
  name: '',
  uid: '',
  isAdmin: false
};

export const userReducer = createReducer(
  initialState,
  on(AddUser, (state, action) => {
    return {
      ...state,
      name: action.user.name,
      uid: action.user.uid,
      isAdmin: action.user.isAdmin
    };
  }),
);


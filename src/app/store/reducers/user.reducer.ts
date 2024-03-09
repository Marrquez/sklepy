import { createReducer, on } from '@ngrx/store';
import { AddUser, UserActions } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  name: string;
  uid: string;
}

export const initialState: UserState = {
  name: '',
  uid: ''
};

export const userReducer = createReducer(
  initialState,
  on(AddUser, (state, action) => {
    return {
      ...state,
      name: action.user.name,
      uid: action.user.uid
    };
  }),
);


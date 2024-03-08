import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  isLogged: boolean;
  name: string;
  id: string;
}

export const initialState: UserState = {
  isLogged: false,
  name: '',
  id: ''
};

export const userReducer = createReducer(
  initialState,
);


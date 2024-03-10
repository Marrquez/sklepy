import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/product.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: unknown }>(),
    'Load Users Failure': props<{ error: unknown }>(),
  }
});

export const AddUser = createAction(
  '[User Component] Add User',
  props<{ user: User }>()
);

export const GetUser = createAction(
  '[User Component] Get User'
);

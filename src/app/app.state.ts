import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

export interface AppState {}

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any): AppState => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = [ logger ];

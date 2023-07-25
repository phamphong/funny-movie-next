/* Core */
import {
  configureStore,
  type ThunkAction,
  type Action,
  combineReducers,
  AnyAction
} from '@reduxjs/toolkit'

import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux'
/* Instruments */
import { reducer } from './rootReducer'
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

const combinedReducers = combineReducers(reducer,);

const reducers: typeof combinedReducers = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    nextState.user = state?.user
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export const reduxStore = () => configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
})
export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector

/* Types */
export type ReduxStore = ReturnType<typeof reduxStore>
export type ReduxState = ReturnType<ReduxStore['getState']>;
export type ReduxDispatch = ReduxStore['dispatch'];
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>

export const wrapper = createWrapper(reduxStore);

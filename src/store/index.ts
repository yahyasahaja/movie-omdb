import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  EnhancedStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { movieReducer } from './Movies';
import { imagePresentationReducer } from './ImagePresentation';

const rootReducer = combineReducers({
  movieStore: movieReducer,
  imagePresentationStore: imagePresentationReducer,
});
const middleware = getDefaultMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

declare global {
  interface Window {
    clientStore: EnhancedStore;
  }
}

export default window.clientStore = store;

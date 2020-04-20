import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  EnhancedStore,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({});
const middleware = getDefaultMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    clientStore: EnhancedStore;
  }
}

export default window.clientStore = store;

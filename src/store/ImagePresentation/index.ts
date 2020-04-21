import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export interface ImagePresentationState {
  isShown: boolean;
  imageUrl: string;
}

const toastInitialState: ImagePresentationState = {
  isShown: false,
  imageUrl: '',
};

export const toastSlice = createSlice({
  name: 'imagePresentation',
  initialState: toastInitialState,
  reducers: {
    showImagePresentation: (state, { payload }: PayloadAction<string>) => {
      state.imageUrl = payload;
      state.isShown = true;
    },
    hideImagePresentation: (state) => {
      state.isShown = false;
    },
  },
});

export const imagePresentationReducer = toastSlice.reducer;

export const {
  showImagePresentation,
  hideImagePresentation,
} = toastSlice.actions;

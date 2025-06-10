import { combineReducers } from '@reduxjs/toolkit';

import { localCartReducer } from './slices';

export const rootReducers = combineReducers({
  localCart: localCartReducer
});

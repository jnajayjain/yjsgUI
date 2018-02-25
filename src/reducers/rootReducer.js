import { combineReducers } from 'redux';

import studentRegistrationReducer from './studentRegistrationReducer';

const rootReducer = combineReducers({
  studentRegistrationReducer,
});

export default rootReducer;
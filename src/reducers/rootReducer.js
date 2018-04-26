import { combineReducers } from 'redux';

import {
  studentRegistrationReducer,
  studentSearchReducer,
} from './studentRegistrationReducer';

const rootReducer = combineReducers({
  studentRegistrationReducer,
  studentSearchReducer,
});

export default rootReducer;
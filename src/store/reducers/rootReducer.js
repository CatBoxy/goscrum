import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';

// combineReducers combines all reducers and sends them to the store
const rootReducer = combineReducers({
  tasksReducer,
})

export default rootReducer;
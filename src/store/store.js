import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from './reducers/rootReducer';

// rootReducer contains all states managed by Redux
// The store will provide the reducers content to components with access to the reducer
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

//required to configure the store 
export const ConfigureStore = () => {
//create the store
  const store = createStore(
    combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
              feedback: InitialFeedback
          })
      }), 
      applyMiddleware(thunk, logger)

  );
  return store;
}

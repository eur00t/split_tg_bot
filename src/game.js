import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import highScoresReducer from './reducers/highScores';
import gameReducer from './reducers/game';
import uiReducer from './reducers/ui';

import Main from './components/Main';

const reducer = combineReducers({
    highScores: highScoresReducer,
    game: gameReducer,
    ui: uiReducer
});

const MainContainer = connect(state => state)(Main);

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <MainContainer />
    </Provider>,
    document.getElementById('container')
);

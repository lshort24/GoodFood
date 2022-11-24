import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {Provider} from "react-redux";
import {createStore} from "redux";
import thunk from 'redux-thunk';
import reducers from "./redux/reducers";
import rootSaga from './redux/sagas';

// Middleware
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga';

// Style
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Components
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// API
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://shortsrecipes.com/api/goodfood';

const sagaMiddleware = createSagaMiddleware();

let middleWare;
if (process.env.NODE_ENV === 'production') {
    middleWare = compose(
        applyMiddleware(sagaMiddleware, thunk)
    )
}
else {
    middleWare = composeWithDevTools(
        applyMiddleware(sagaMiddleware, thunk)
    )
}

const store = createStore(reducers, middleWare);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>,
   document.getElementById('root'));
//registerServiceWorker();

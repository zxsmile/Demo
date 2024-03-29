import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './styles/App.less';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import rootReducer from './store/reducers';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));

registerServiceWorker();

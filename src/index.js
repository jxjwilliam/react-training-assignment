import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {devToolsEnhancer} from 'redux-devtools-extension';

import rootReducer from './reducers/'
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from './chinasofti_logo.png';
import './App.css';
import './index.css';
import Home from './components/Home'
import Navigator from './components/Navigator'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import S5 from './containers/';
import ListTable from './components/ListTable'
import RequestForm from './components/RequestForm'
import Data from './etc/Data'

import registerServiceWorker from './registerServiceWorker';

const App = () => (
    <Router>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to On-Leave Management Dashboard</h1>
                <Navigator/>
            </header>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/generallogin" component={S5.GeneralLogin}/>
                <Route path="/adminlogin" component={S5.AdminLogin}/>
                <Route path="/info" component={S5.Information}/>
                <Route path="/list"
                       render={(routeProps) => (
                           <ListTable
                               requests={Data.requests}
                               isAdmin="true"
                               {...routeProps}
                           />
                       )}
                />
                <Route path="/request" component={RequestForm}/>
                <Route component={NotFound}/>
            </Switch>
            <hr/>
            <Footer/>
        </div>
    </Router>
)
App.propTypes = {
    projectName: PropTypes.string
}

const middlewares = [thunk, createLogger()];
const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), devToolsEnhancer())
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();

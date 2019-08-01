import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Header from './pages/public/Header';
import Footer from './pages/public/Footer';
import Main from './pages/Main';
import Page from './pages/Page';

import PageBase from './pages/pageBase';
import PageVideo from './pages/pageVideo';
import PageCase from './pages/pageCase';

import Soft1 from './pages/Soft1';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <div className='outerHeight'>
                        <Switch>
                            <Route exact path="/" render={() => (<Redirect to="/main"/>)}/>
                            <Route path="/main" component={Main}/>
                            <Route path="/page" component={Page}/>

                            <Route path="/pageBase" component={PageBase}/>
                            <Route path="/pageVideo" component={PageVideo}/>
                            <Route path="/pageCase" component={PageCase}/>

                            <Route path="/soft1" component={Soft1}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

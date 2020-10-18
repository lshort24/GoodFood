import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';

//import {Route} from 'react-router-dom';
import Router from './router/Router';

//import GoogleAuth from "./components/GoogleAuth";

import './App.css';

const styles = {
    appBar: {
        position: 'fixed',
        padding: 12,
        backgroundColor: '#222222',
        color: 'white',
        width: '100%'
    },
    title: {
        fontSize: 24
    },
    loginButton: {
        margin: 10,
        padding: 10
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <div
                    role={"banner"}
                    className={this.props.classes.appBar}
                >
                    <Typography variant="h1" className={this.props.classes.title}>
                        Good Food!
                    </Typography>

                </div>
                <Router/>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);
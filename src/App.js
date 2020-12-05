import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';

//import {Route} from 'react-router-dom';
import Router from './router/Router';

//import GoogleAuth from "./components/GoogleAuth";
import { googleApiInit, signIn, authenticate } from './auth/googleAuth';

import './App.css';

const styles = {
    appBar: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        backgroundColor: '#222222',
        color: 'white',
        width: '100%'
    },
    title: {
        marginTop: 8,
        marginLeft: 8,
        fontSize: 24,
        lineHeight: '52px',
    },
    loginButton: {
        display: 'block',
        backgroundColor: '#222222',
        marginTop: 3,
        marginRight: 3,
        padding: 0,
        border: 'none',
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        googleApiInit().then(() => {
            console.log('google API has been initialized');
        }).catch(error => {
            console.log("There was an error trying to initialize Google API", error);
        })
    }

    handleGoogleClick = () => {
        signIn().then(() => {
            console.log('Signed in to Google')
            authenticate().then(response => {
                console.log('Authenticated', response)
            }).catch(error => {
                console.log('Could not authenticate', error)
            })
        }).catch(error => {
            console.log('Could not sign in to Google', error);
        })
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
                    <button className={this.props.classes.loginButton} onClick={this.handleGoogleClick}>
                        <img alt="sign in with Google" src="https://shortsrecipes.com/lifetime/images/btn_google_signin_dark_normal_web.png"/>
                    </button>
                </div>
                <Router/>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);
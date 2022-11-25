import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Router from './router/Router';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Actions
import { updateAuth } from './redux/actions/authActions';
import {getRecipeSummaryRequest} from './redux/actions/recipes';

import './App.css';

// Components
import GoogleIdentitySignIn from "./components/GoogleIdentitySignIn";

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
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        document.title = 'Good Food';
        this.props.getRecipeSummaryRequest(this.props.keywords);
    }

    render() {
        return (
            <GoogleOAuthProvider clientId="661327317122-1hskbdb40mj678isegkl2ottnr1h9etg.apps.googleusercontent.com">
                <div
                    role={"banner"}
                    className={this.props.classes.appBar}
                >
                    <Typography variant="h1" className={this.props.classes.title}>
                        Good Food!
                    </Typography>
                    <GoogleIdentitySignIn />
                </div>
                <Router/>
            </GoogleOAuthProvider>
        );
    }
}

const mapStateToProps = state => ({
    keywords: state.recipes.keywords,
});

const mapDispatchToProps = {
    updateAuth,
    getRecipeSummaryRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
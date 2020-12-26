import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Router from './router/Router';
import { googleApiInit, isSignedIn, getProfileName } from './auth/googleAuth';

// Actions
import { updateAuth } from './redux/actions/authActions';
import {fetchRecipeList, updateKeywords} from './redux/actions/recipesActions';

import './App.css';

// Components
import SignIn from './components/SignIn';

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
        googleApiInit().then(() => {
            console.log('google API has been initialized');
            if (isSignedIn()) {
                this.props.updateAuth(true, getProfileName());
            }
            else {
                this.props.updateAuth(false);
            }
        }).catch(error => {
            console.log("There was an error trying to initialize Google API", error);
        })

        const keywords = sessionStorage.getItem('keywords') || '';
        this.props.updateKeywords(keywords);
        this.props.fetchRecipeList(keywords);
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
                    <SignIn />
                </div>
                <Router/>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateAuth: (isSignedIn, profileName) => dispatch(updateAuth(isSignedIn, profileName)),
    updateKeywords: keywords => dispatch(updateKeywords(keywords)),
    fetchRecipeList: keywords => dispatch(fetchRecipeList(keywords))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(App));
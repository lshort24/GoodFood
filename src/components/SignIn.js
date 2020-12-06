import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

// Google Auth
import { getBearerToken, signIn, signOut, getProfileName } from "../auth/googleAuth";

// API
import shortAPI from "../api/shortAPI";

// Components
import { Link } from '@material-ui/core';
import {updateAuth} from "../redux/actions/authActions";

const styles = {
    signedInMessage: {
        marginRight: 8,
        lineHeight: '52px'
    },
    signInButton: {
        display: 'block',
        backgroundColor: '#222222',
        marginTop: 3,
        marginRight: 3,
        padding: 0,
        border: 'none',
    },
    signOutLink: {
        marginLeft: 4,
        color: '#ffffff',
        textDecoration: 'underline',
    }
}

function SignIn({
    classes,
    isSignedIn,
    profileName,
    updateAuth,
}) {
    const handleGoogleSignInClick = () => {
        signIn().then(() => {
            const token = getBearerToken();
            const config = {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            };
            shortAPI.post('/goodfood/authtest/index.php', {}, config).then(response => {
                console.log('testauth response', response);
                // noinspection JSUnresolvedVariable
                if (response.data.authenticated) {
                    updateAuth(true, getProfileName())
                }
                else {
                    console.log('Could not sign in.', response.data.reason);
                    alert('Sorry, you are not authorized to be an admin on this website.');
                }
            }).catch(error => {
                console.log('Could not send testauth request', error);
            })
        }).catch(error => {
            console.log('Could not sign in to Google', error);
        })
    }

    const handleGoogleSignOutClick = () => {
        signOut().then(() => {
            updateAuth(false);
        })
    }

    if (isSignedIn === null) {
        return null;
    }

    if (isSignedIn) {
        return (
            <div className={classes.signedInMessage}>
                Hi {profileName}!
                <Link className={classes.signOutLink} onClick={handleGoogleSignOutClick}>
                    sign out
                </Link>
            </div>
        )
    }

    return (
        <div>
            <button className={classes.signInButton} onClick={handleGoogleSignInClick}>
                <img alt="sign in with Google" src="https://shortsrecipes.com/lifetime/images/btn_google_signin_dark_normal_web.png"/>
            </button>
        </div>
    )
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,

    // From State
    isSignedIn: PropTypes.bool,
    profileName: PropTypes.string,

    // Actions
    updateAuth: PropTypes.func.isRequired
}

SignIn.defaultProps = {
    isSignedIn: null,
    profileName: ''
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        profileName: state.auth.profileName,
    }
};

const mapDispatchToProps = {
    updateAuth
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
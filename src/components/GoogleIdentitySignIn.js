import React from 'react';

// API
import shortAPI from '../api/shortAPI';

// Components
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {Typography, Link} from '@mui/material';

// Redux
import {updateAuth} from "../redux/actions/authActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function GoogleIdentitySignIn ({isSignedIn, profileName, updateAuth,}) {
    const handleGoogleSignOutClick = () => {
        googleLogout();
        updateAuth(false, '');
    }

    if (isSignedIn) {
        return(
            <div>
                <Typography
                    paragraph={true}
                    variant='body1'
                    sx = {{paddingTop: '8px', paddingRight: '8px'}}
                >
                    Hi {profileName}! <Link onClick={handleGoogleSignOutClick}>
                        sign out
                    </Link>
                </Typography>

            </div>
        )
    }

    const defaultMessage = 'There was a problem signing into the Good Food website.';

    return(
        <GoogleLogin
            onSuccess={credentialResponse => {
                shortAPI.post('/verifyJWToken.php', {credential: credentialResponse.credential}).then(response => {
                    if (response.data.authenticated) {
                        updateAuth(true, response.data.profileName);
                    }
                    else {
                        // TODO Create a redux action to display a nicer message box.
                        alert(`${defaultMessage} ${response.data.failReason}`);
                    }
                }).catch = (error) => {
                    console.log('There was an error with Google login', error);
                    alert(defaultMessage);
                    updateAuth(false, '');
                }
            }}
            onError={() => {
                alert(defaultMessage);
                updateAuth(false, '');
            }}
            shape='pill'
            theme='filled_blue'
        />
    )
}

GoogleIdentitySignIn.propTypes = {
    // From State
    isSignedIn: PropTypes.bool,
    profileName: PropTypes.string,

    // Actions
    updateAuth: PropTypes.func.isRequired
}

GoogleIdentitySignIn.defaultProps = {
    isSignedIn: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(GoogleIdentitySignIn);
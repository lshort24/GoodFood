import { googleClientId } from '../secrets';

/**
 * @typedef {Object} Auth2
 * @property {function} getAuthInstance
 *
 * @typedef {Object} BasicProfile
 * @property {function} getGivenName
 *
 * @typedef {Object} GoogleUser
 * @property {function} getBasicProfile
 *
 * @typedef {Object} GoogleAuth
 * @property {Object} currentUser
 * @property {function} getAuthResponse
 * @property {function} signIn
 * @property {function} signOut
 *
 * @typedef {Object} AuthResponse
 * @property {string} id_token
 * @property {string} expires_at
 *
 * @typedef {Object} GAPI
 * @property {function} load
 * @property {Auth2} auth2
 *
 * @typedef {Object} Window
 * @property {GAPI} gapi
 */

const googleApiInit = () => {
    return new Promise((resolve, reject) => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({client_id: googleClientId}).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    })
}

const isSignedIn = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    if (googleAuth) {
        return googleAuth.isSignedIn.get();
    }
    return false;
}

const getProfileName = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    if (googleAuth) {
        const googleUser = googleAuth.currentUser.get();
        const profile = googleUser.getBasicProfile();
        return profile.getGivenName();
    }
    return '';
}

const signIn = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    return googleAuth.signIn();
}

const getBearerToken = () => {
    const idToken = localStorage.getItem('idToken');
    const idTokenExpiresAt = localStorage.getItem('idTokenExpiresAt');
    if (idToken && idTokenExpiresAt) {
        const now = new Date();
        const expiresAt = new Date(parseInt(idTokenExpiresAt));
        if (now < expiresAt) {
            console.log(`Using current id token. It will expire at ${expiresAt}`);
            return idToken;
        }
    }

    console.log('ID token has expired, fetching a new one.');
    const googleAuth = window.gapi.auth2.getAuthInstance();
    if (!googleAuth || googleAuth.isSignedIn.get() === false) {
        throw new Error('User is not signed in');
    }

    const googleUser = googleAuth.currentUser.get();
    const authResponse = googleUser.getAuthResponse();

    // Update cache
    localStorage.setItem('idToken', authResponse.id_token);
    localStorage.setItem('idTokenExpiresAt', authResponse.expires_at);

    return authResponse.id_token;
}

/**
 * Signs out of Google
 *
 * @returns {Promise}
 */
const signOut = () => {
    console.log('signing out of Google');

    // Update cache
    localStorage.removeItem('idToken');
    localStorage.removeItem('idTokenExpiresAt');

    const googleAuth = window.gapi.auth2.getAuthInstance();
    return googleAuth.signOut();
}

export {
    googleApiInit,
    isSignedIn,
    getProfileName,
    signIn,
    getBearerToken,
    signOut,
}
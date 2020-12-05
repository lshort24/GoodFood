import { googleClientId } from '../secrets';
import shortAPI from "../api/shortAPI";

/**
 * @typedef {Object} Auth2
 * @property {function} getAuthInstance
 *
 * @typedef {Object} GoogleAuth
 * @property {Object} currentUser
 * @property {function} getAuthResponse
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

const signIn = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    return googleAuth.signIn();
}

const authenticate = () => {
    return new Promise((resolve, reject) => {
        const idToken = localStorage.getItem('idToken');
        const idTokenExpiresAt = localStorage.getItem('idTokenExpiresAt');
        if (idToken && idTokenExpiresAt) {
            const now = new Date();
            const expiresAt = new Date(parseInt(idTokenExpiresAt));
            if (now < expiresAt) {
                console.log(`Authenticated because the token has not expired yet. It will expire at ${expiresAt}`);
                resolve({
                    authenticated: true,
                    idToken
                });
                return;
            }
        }

        console.log('ID token has expired, fetching a new one.');
        const googleAuth = window.gapi.auth2.getAuthInstance();
        if (!googleAuth || googleAuth.isSignedIn.get() === false) {
            reject(new Error('User is not signed in'));
            return;
        }

        const googleUser = googleAuth.currentUser.get();
        const authResponse = googleUser.getAuthResponse();

        // Validate the id_token
        shortAPI.post('/authenticate.php', {idToken: authResponse.id_token}, {withCredentials: true}).then((response) => {
            // Update cache
            localStorage.setItem('idToken', authResponse.id_token);
            localStorage.setItem('idTokenExpiresAt', authResponse.expires_at);
            resolve({...response.data, idToken});
        }).catch((error) => {
            reject(error);
        })
    });
}

export {
    googleApiInit,
    signIn,
    authenticate
}
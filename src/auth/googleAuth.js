import { googleClientId } from '../secrets';

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

export {
    googleApiInit
}
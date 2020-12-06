const UPDATE_AUTH = 'update_auth';

/**
 * Update the authentication information
 *
 * @param {boolean} isSignedIn
 * @param {string} profileName
 * @returns {{payload: {signedIn}, type: string}}
 */
const updateAuth = (isSignedIn, profileName = '') => {
   return {
      type: UPDATE_AUTH,
      payload: {
         isSignedIn,
         profileName,
      }
   }
}

export {
   UPDATE_AUTH,
   updateAuth
}


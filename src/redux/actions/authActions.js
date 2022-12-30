const UPDATE_AUTH = 'update_auth';

/**
 * Update the authentication information
 *
 * @param {boolean} isSignedIn
 * @param {string} profileName
 * @param {string} role
 * @returns {{payload: {signedIn}, type: string}}
 */
const updateAuth = (isSignedIn, profileName = '', role = 'guest') => {
   return {
      type: UPDATE_AUTH,
      payload: {
         isSignedIn,
         profileName,
         role,
      }
   }
}

export {
   UPDATE_AUTH,
   updateAuth
}


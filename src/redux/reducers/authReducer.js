import { UPDATE_AUTH } from '../actions/authActions';
import {getCookieValue} from '../../util';

let isSignedIn = false;
let profileName = '';

const accessToken = getCookieValue('accessToken');
if (accessToken) {
   console.log('access token', accessToken);
   const parts = accessToken.split('.');
   console.log('parts', parts);
   if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      console.log('access token payload', payload);
      if (payload?.userId && payload?.profileName) {
         isSignedIn = true;
         profileName = payload.profileName;
      }
   }
}

const INITIAL_STATE = {
   isSignedIn,
   profileName,
   userId: null
};

const authReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case UPDATE_AUTH:
         return {
            ...state,
            isSignedIn: action.payload.isSignedIn,
            profileName: action.payload.profileName
         }
      default:
         return state;
   }
};

export default authReducer;
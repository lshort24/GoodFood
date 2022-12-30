import { UPDATE_AUTH } from '../actions/authActions';
import {getCookieValue} from '../../util';

let isSignedIn = false;
let profileName = '';
let role = 'guest';

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
         role = payload.role
      }
   }
}

const INITIAL_STATE = {
   isSignedIn,
   profileName,
   role,
   userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case UPDATE_AUTH:
         return {
            ...state,
            isSignedIn: action.payload.isSignedIn,
            profileName: action.payload.profileName,
            role: action.payload.role,
         }
      default:
         return state;
   }
};

const selectIsAdmin = (state) => state.role === 'admin';

export default authReducer;
export {selectIsAdmin}
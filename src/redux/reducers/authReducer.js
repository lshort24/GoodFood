import { UPDATE_AUTH } from '../actions/authActions';

const INITIAL_STATE = {
   isSignedIn: null,
   profileName: '',
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
import {combineReducers} from "redux";
import authReducer from "./authReducer";
import recipesReducer from "./recipes";

const reducer =  combineReducers({
   auth: authReducer,
   recipes: recipesReducer,
});

export default reducer;
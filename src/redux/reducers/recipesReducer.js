import {UPDATE_RECIPE_LIST, UPDATE_KEYWORDS} from "../actions/recipesActions";

const INITIAL_STATE = {
    keywords: sessionStorage.getItem('keywords') || '',
    recipes: []
}

const recipesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_RECIPE_LIST:
            return {
                ...state,
                recipes: action.recipes,
            }
        case UPDATE_KEYWORDS:
            sessionStorage.setItem('keywords', action.keywords);
            return {
                ...state,
                keywords: action.keywords,
            }
        default:
            return state
    }
}

export default recipesReducer;
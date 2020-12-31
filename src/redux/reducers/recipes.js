import {Types} from '../actions/recipes';

const INITIAL_STATE = {
    keywords: '',
    summary: [],
    recipe: null
}

function recipes(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_RECIPE_SUMMARY_SUCCESS:
            return {
                ...state,
                summary: action.payload.summary
            }
        case Types.GET_RECIPE_SUCCESS:
            return {
                ...state,
                recipe: action.payload.recipe
            }
        case Types.UPDATE_KEYWORDS:
            return {
                ...state,
                keywords: action.payload.keywords
            }
        default:
            return state;
    }
}

export default recipes;
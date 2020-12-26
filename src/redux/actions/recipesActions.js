import {apiHostname} from "../../env";

const FETCH_RECIPE_LIST = 'fetch_recipe_list';
const UPDATE_RECIPE_LIST = 'update_recipe_list';
const UPDATE_KEYWORDS = 'update_keywords';

// Actions
const updateKeywords = (keywords) => {
    sessionStorage.setItem('keywords', keywords);
    return {
        type: UPDATE_KEYWORDS,
        keywords,
    }
}

const updateRecipeList = (recipes) => ({
    type: UPDATE_RECIPE_LIST,
    recipes,
})

// Thunks
const fetchRecipeList = (keywords) => {
    return async (dispatch) => {
        const keywordsParam = keywords ? `?keywords=${keywords}` : '';
        const url = `https://${apiHostname}/services/recipe_list.php${keywordsParam}`;
        const response = await fetch(url);
        const data = await response.json();
        dispatch(updateRecipeList(data.recipe_list));
    }
}

export {
    FETCH_RECIPE_LIST,
    UPDATE_RECIPE_LIST,
    UPDATE_KEYWORDS,

    fetchRecipeList,
    updateKeywords,
    updateRecipeList,
}
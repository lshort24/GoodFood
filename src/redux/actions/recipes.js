const Types = {
    GET_RECIPE_SUMMARY_REQUEST: 'recipes/get_recipe_summary_request',
    GET_RECIPE_SUMMARY_SUCCESS: 'recipes/get_recipe_summary_success',
    GET_RECIPE_REQUEST: 'recipes/get_recipe_request',
    GET_RECIPE_SUCCESS: 'recipes/get_recipe_success',
    UPDATE_KEYWORDS: 'recipes/update_keywords',
    UPDATE_SELECTED_RECIPE: 'recipes/update_selected_recipe'
}

const getRecipeSummaryRequest = (keywords) => ({
    type: Types.GET_RECIPE_SUMMARY_REQUEST,
    payload: {
        keywords
    }
});

const getRecipeSummarySuccess = (summary) => ({
    type: Types.GET_RECIPE_SUMMARY_SUCCESS,
    payload: {
        summary
    }
})

const getRecipeRequest = (id) => ({
    type: Types.GET_RECIPE_REQUEST,
    payload: {
        id
    }
});

const getRecipeSuccess = (recipe) => ({
    type: Types.GET_RECIPE_SUCCESS,
    payload: {
        recipe
    }
})

const updateKeywords = (keywords) => ({
    type: Types.UPDATE_KEYWORDS,
    payload: {
        keywords
    }
})

const updateSelectedRecipe = recipe => ({
    type: Types.UPDATE_SELECTED_RECIPE,
    payload: {
        recipe
    }
})


export {
    Types,
    getRecipeSummaryRequest,
    getRecipeSummarySuccess,
    getRecipeRequest,
    getRecipeSuccess,
    updateKeywords,
    updateSelectedRecipe
};